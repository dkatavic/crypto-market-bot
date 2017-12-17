const _ = require('lodash')

const mainCrypto = ['btc', 'eth']
const currencies = ['usd']

const all = [
  "btcusd",
  "btceur",

  // too small variance
  // "ltcusd",
  // "ltcbtc",
  // "ethusd",
  // "ethbtc",
  // "etcbtc",
  // "etcusd",

  "rrtusd",
  "rrtbtc",
  "zecusd",
  "zecbtc",
  "xmrusd",
  "xmrbtc",
  "dshusd",
  "dshbtc",

  // too small variance
  // "xrpusd",
  // "xrpbtc",

  // too small variance
  // "iotusd",
  // "iotbtc",
  // "ioteth",

  "eosusd",
  "eosbtc",
  "eoseth",
  "sanusd",
  "sanbtc",
  "saneth",
  "omgusd",
  "omgbtc",
  "omgeth",
  "bchusd",
  "bchbtc",
  "bcheth",
  "neousd",
  "neobtc",
  "neoeth",
  "etpusd",
  "etpbtc",
  "etpeth",
  "qtmusd",
  "qtmbtc",
  "qtmeth",
  // "bt1usd",
  // "bt2usd",
  // "bt1btc",
  // "bt2btc",
  "avtusd",
  "avtbtc",
  "avteth",
  "edousd",
  "edobtc",
  "edoeth",
  "btgusd",
  "btgbtc",
  "datusd",
  "datbtc",
  "dateth",
  "qshusd",
  "qshbtc",
  "qsheth",
  "yywusd",
  "yywbtc",
  "yyweth"
]

module.exports = {
  getPaths: () => {
    const grouped = _.groupBy(all, (symbol) => symbol.substring(0, 3))
    const allPaths = []
    Object.keys(grouped)
      .filter((key) => !mainCrypto.includes(key))
      .forEach((key) => {
        const allSymbols = grouped[key]
        if (!allSymbols.includes(`${key}usd`)) {
          return
        }
        // console.log(allSymbols)
        const filtered = _.filter(allSymbols, (symbol) => mainCrypto.includes(symbol.substring(3, 6)))
        filtered.forEach((symbol) => {
          const tr1 = symbol.substring(0, 3)
          const tr2 = symbol.substring(3, 6)
          allPaths.push([
            `${tr2}usd`,
            symbol,
            `${tr1}usd`
          ])
        })
      })
    return allPaths
  }
}

// console.log(module.exports.getPaths())