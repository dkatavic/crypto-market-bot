const BFX = require('bitfinex-api-node')
const request = require('request-promise')
var memoize = require('memoizee')
const url = 'https://api.bitfinex.com/v1'
const bfxRest = new BFX('', '', { version: 1 }).rest



const main = async (symbol) => {
  return new Promise((resolve, reject) => {
    bfxRest.ticker(symbol, (err, res) => {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

const main2 = async (symbol) => {
  const data = await request.get({
    uri: url + `/pubticker/${symbol}`,
    json: true,
  })
  return data
}

module.exports = {
  live: main2,
  memoized: memoize(main2, { promise: true, maxAge: 1000 }),
}