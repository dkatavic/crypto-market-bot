const getOrderBook = require('./bitfinex-api/getOrderBook')
const getMainToFiatSymbols = require('./utils/getMainToFiatSymbols')
const getSideToFiatSymbols = require('./utils/getSideToFiatSymbols')
const getSideToMainSymbols = require('./utils/getSideToMainSymbols')

const getPrice = (orders) => Number.parseFloat(orders[0].price)

const generateTrade = (price, side, symbol) => ({
  price,
  side,
  symbol,
})

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
  const mainToFiat = getMainToFiatSymbols(symbols)[0]
  const sideToFiat = getSideToFiatSymbols(symbols)[0]
  const sideToMain = getSideToMainSymbols(symbols)[0]

  const mainToFiatPrice = getPrice(orderBooks[mainToFiat].asks)
  const sideToFiatPrice = getPrice(orderBooks[sideToFiat].bids)
  const sideToMainPrice = getPrice(orderBooks[sideToMain].asks)

  const profitPerc = ((1 / mainToFiatPrice / sideToMainPrice * sideToFiatPrice) - 1) * 100
  const fiat = mainToFiat.substring(3, 6)

  const trades = [
    generateTrade(mainToFiatPrice, 'buy', mainToFiat),
    generateTrade(sideToMainPrice, 'buy', sideToMain),
    generateTrade(sideToFiatPrice, 'sell', sideToFiat),
  ]
  return {
    profitPerc,
    fiat,
    trades,
  }
}

const simulateFiatSideMainFiatTrade = ({
  symbols,
  orderBooks,
  //  fiatBallance,
}) => {
  const mainToFiat = getMainToFiatSymbols(symbols)[0]
  const sideToFiat = getSideToFiatSymbols(symbols)[0]
  const sideToMain = getSideToMainSymbols(symbols)[0]

  const mainToFiatPrice = getPrice(orderBooks[mainToFiat].asks)
  const sideToFiatPrice = getPrice(orderBooks[sideToFiat].bids)
  const sideToMainPrice = getPrice(orderBooks[sideToMain].asks)

  const profitPerc = ((1 / sideToFiatPrice / sideToMainPrice * sideToFiatPrice) - 1) * 100
  // const profitPerc = ((1 / mainToFiatPrice / sideToMainPrice * sideToFiatPrice) - 1) * 100
  const fiat = mainToFiat.substring(3, 6)

  const trades = [
    generateTrade(mainToFiatPrice, 'buy', mainToFiat),
    generateTrade(sideToMainPrice, 'buy', sideToMain),
    generateTrade(sideToFiatPrice, 'sell', sideToFiat),
  ]
  return {
    profitPerc,
    fiat,
    trades,
  }
}

module.exports = {
  simulate: simulateTrade,
  simulateFiatMainSideFiatTrade,
}
