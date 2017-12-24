const express = require('express')
const { json2csv } = require('json-2-csv')
const _ = require('lodash')
const app = express()

app.get('/download', (req, res) => {
  const dataFile = require('../../result')
  json2csv(dataFile, (err, csvFile) => {
    res.set('Content-Type', 'application/csv')
    res.set('Content-Disposition', 'attachment; filename=example.csv')
    res.send(csvFile)
  })
})

app.get('/download/top100', (req, res) => {
  const dataFile = require('../../result')
  const sortedJson = _.take(
    _.sortBy(
      dataFile,
      ({ profitPerc }) => profitPerc * -1),
    100)
  json2csv(sortedJson, (err, csvFile) => {
    res.set('Content-Type', 'application/csv')
    res.set('Content-Disposition', 'attachment; filename=example.csv')
    res.send(csvFile)
  })
})

app.listen(3000, () => console.log('Server listening on port 3000!'))