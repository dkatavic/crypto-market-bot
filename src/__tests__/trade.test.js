const { simulate, simulateFiatMainSideFiatTrade, simulateFiatSideMainFiatTrade } = require('../trade')
const getOrderBook = require('../bitfinex-api/getOrderBook')

jest.mock('../bitfinex-api/getOrderBook')

const btcUsdFixtures = require('./fixtures/orders/btcusd')
const iotBtcFixtures = require('./fixtures/orders/iotbtc')
const iotUsdFixtures = require('./fixtures/orders/iotusd')
const testSymbols = ['iotbtc', 'iotusd', 'btcusd']

test('should check is there a probitable trade', async () => {

  getOrderBook.mockImplementation(async (symbol) => {
    if (symbol === 'btcusd') {
      return btcUsdFixtures
    } else if (symbol === 'iotusd') {
      return iotUsdFixtures
    } else if (symbol === 'iotbtc') {
      return iotBtcFixtures
    } else {
      throw new Error(`Unknown symbol ${symbol}`)
    }
  })
  const expected = {
    fiatMainSideFiat: {
      profitPerc: -0.2894688375565835,
      // maxProfitFiat: -30,
      fiat: 'usd',
      trades: [
        {
          symbol: 'btcusd',
          // amount: 0.1,
          side: 'buy',
          // this is for debugging
          price: 18810,
        },
        {
          symbol: 'iotbtc',
          // amount: 10,
          side: 'buy',
          // this is for debugging
          price: 0.00019141,
        },
        {
          symbol: 'iotusd',
          // amount: 2,
          side: 'sell',
          // this is for debugging
          price: 3.59,
        },
      ],
    },
    fiatSideMainFiat: {
      profitPerc: 0.1773694175297713,
      // maxProfitFiat: -30,
      fiat: 'usd',
      trades: [
        {
          symbol: 'iotusd',
          // amount: 2,
          side: 'buy',
          // this is for debugging
          price: 3.5916,
        },
        {
          symbol: 'iotbtc',
          // amount: 10,
          side: 'sell',
          // this is for debugging
          price: 0.0001913,
        },
        {
          symbol: 'btcusd',
          // amount: 0.1,
          side: 'sell',
          // this is for debugging
          price: 18808,
        },
      ],
    },
  }

  const result = await simulate(testSymbols)

  expect(result).toEqual(expected)

  getOrderBook.mockReset()
})

test('Should simulate Fiat-Main-Side-Fiat trade when amount less than ballance', () => {
  const input = {
    symbols: testSymbols,
    orderBooks: {
      'iotbtc': iotBtcFixtures,
      'iotusd': iotUsdFixtures,
      'btcusd': btcUsdFixtures,
    },
    fiatBallance: {
      'usd': 1000000,
      'eur': 0,
    },
  }
  // -0.2894688375565835 = (((1 / 18810) / 0.00019141 * 3.59) - 1) * 100
  const profitPerc = -0.2894688375565835
  const expected = {
    profitPerc,
    // maxProfitFiat: -30,
    fiat: 'usd',
    trades: [
      {
        symbol: 'btcusd',
        // amount: 0.1,
        side: 'buy',
        // this is for debugging
        price: 18810,
      },
      {
        symbol: 'iotbtc',
        // amount: 10,
        side: 'buy',
        // this is for debugging
        price: 0.00019141,
      },
      {
        symbol: 'iotusd',
        // amount: 2,
        side: 'sell',
        // this is for debugging
        price: 3.59,
      },
    ],
  }
  const result = simulateFiatMainSideFiatTrade(input)
  expect(result).toEqual(expected)
})


test('Should simulate Fiat-Side-Main-Fiat trade when amount less than ballance', () => {
  const input = {
    symbols: testSymbols,
    orderBooks: {
      'iotbtc': iotBtcFixtures,
      'iotusd': iotUsdFixtures,
      'btcusd': btcUsdFixtures,
    },
    fiatBallance: {
      'usd': 1000000,
      'eur': 0,
    },
  }
  // 0.1773694175297713 = (((1 / 3.5916) * 0.0001913 * 18808) - 1) * 100
  const profitPerc = 0.1773694175297713
  const expected = {
    profitPerc,
    // maxProfitFiat: -30,
    fiat: 'usd',
    trades: [
      {
        symbol: 'iotusd',
        // amount: 2,
        side: 'buy',
        // this is for debugging
        price: 3.5916,
      },
      {
        symbol: 'iotbtc',
        // amount: 10,
        side: 'sell',
        // this is for debugging
        price: 0.0001913,
      },
      {
        symbol: 'btcusd',
        // amount: 0.1,
        side: 'sell',
        // this is for debugging
        price: 18808,
      },
    ],
  }
  const result = simulateFiatSideMainFiatTrade(input)
  expect(result).toEqual(expected)
})

/**
 * Znaci imas symbole
 * provjeris bookove
 * vidi tradeove
 * uzmi u obzir cijenu, volumen i fee
 * outputaj: {profit%, maxProfitUSD, trades: [{}]}
 */