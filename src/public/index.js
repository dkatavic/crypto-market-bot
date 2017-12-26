const express = require('express')
const { json2csv } = require('json-2-csv')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const app = express()

app.get('/download/priceDiffAnalysis/json', (req, res) => {
  const dataFile =
    fs.readFileSync(
      path.join(__dirname, '../../result.json')
    )

  res.set('Content-Type', 'application/json')
  res.set('Content-Disposition', 'attachment; filename=priceDiffAnalysis.json')
  res.send(dataFile)
})

app.get('/download/priceDiffAnalysis', (req, res) => {
  const dataFile = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../../result.json')
    )
  )
  json2csv(dataFile, (err, csvFile) => {
    res.set('Content-Type', 'application/csv')
    res.set('Content-Disposition', 'attachment; filename=priceDiffAnalysis.csv')
    res.send(csvFile)
  }, { keys: ['profitPerc', 'trades', 'orderBookSymbols'] })
})

app.get('/download/priceDiffAnalysis/top100', (req, res) => {
  const dataFile = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../../result.json')
    )
  )
  const sortedJson = _.take(
    _.sortBy(
      dataFile,
      ({ profitPerc }) => profitPerc * -1),
    100)
  json2csv(sortedJson, (err, csvFile) => {
    res.set('Content-Type', 'application/csv')
    res.set('Content-Disposition', 'attachment; filename=priceDiffAnalysis.csv')
    res.send(csvFile)
  }, { keys: ['profitPerc', 'trades', 'orderBookSymbols'] })
})

app.listen(3000, () => console.log('Server listening on port 3000!'))