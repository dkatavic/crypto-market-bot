const getOrderBook = require('./bitfinex-api/getOrderBook')



/**
 * We are simulating the trade. At the end we are gonna print how much can we make
 * @param {*} symbols 
 */
const simulateTrade = async (symbols) => {
  // get all orderBooks
  const orderBookSymbolsArr = await Promise.all(symbols.map(async (symbol) => {
    const orders = await getOrderBook(symbol)
    return { [symbol]: orders }
  }))
  // transform to the dictionary
  const orderBookSymbols = Object.assign({}, ...orderBookSymbolsArr)
  // now when you have the data
  // get conbos. Check Diff and take into account volume
}

const simulateFiatMainSideFiatTrade = ({ symbols, orderBooks, fiatBallance }) => {

}

module.exports = {
  simulate: simulateTrade,
  simulateFiatMainSideFiatTrade
}