const { simulate, simulateFiatMainSideFiatTrade } = require('../trade')
const getOrderBook = require('../bitfinex-api/getOrderBook')

jest.mock('../bitfinex-api/getOrderBook')

const btcUsdFixtures = require('./fixtures/orders/btcusd')
const iotBtcFixtures = require('./fixtures/orders/iotbtc')
const iotUsdFixtures = require('./fixtures/orders/iotusd')

test.skip('should check is there a probitable trade', () => {
  const symbols = ['iotbtc', 'iotusd', 'btcusd']

  getOrderBook.mockImplementation(async (symbol) => {
    if (symbol === 'btcusd') {
      return btcUsdFixtures
    } else if (symbol === 'iotusd') {
      return iotUsdFixtures
    } else if (symbol === 'iotbtc') {
      return iotBtcFixtures
    } else {
      throw new Error(`Unknown symbol ${symobl}`)
    }
  })
  const expected = {
    fiatMainSideFiat: {
      profitPerc: -1,
      maxProfitFiat: -30,
      fiat: 'usd',
      trades: [
        {
          symbol: 'btcusd',
          amount: 0.1,
          side: 'buy',
          // this is for debugging
          price: 18000
        },
        {
          symbol: 'iotbtc',
          amount: 10,
          side: 'buy',
          // this is for debugging
          price: 0.002
        },
        {
          symbol: 'iotusd',
          amount: 2,
          side: 'sell',
          // this is for debugging
          price: 4
        },
      ]
    },
    fiatSideMainFiat: {
      profitPerc: -1.2,
      maxProfitFiat: -33,
      fiat: 'usd',
      trades: [
        {
          symbol: 'iotusd',
          amount: 2,
          side: 'buy',
          // this is for debugging
          price: 4
        },
        {
          symbol: 'iotbtc',
          amount: 10,
          side: 'sell',
          // this is for debugging
          price: 0.002
        },
        {
          symbol: 'btcusd',
          amount: 0.1,
          side: 'sell',
          // this is for debugging
          price: 18000
        },
      ]
    }
  }

  const result = await simulate()

  expect(result).toEqual(expected)

  getOrderBook.clear()
})

test('Should simulate Fiat-Main-Side-Fiat trade when amount less than ballance', () => {
  const input = {
    symbols: ['iotbtc', 'iotusd', 'btcusd'],
    orderBooks: {
      'iotbtc': iotBtcFixtures,
      'iotusd': iotUsdFixtures,
      'btcusd': btcUsdFixtures,
    },
    fiatBallance: {
      'usd': 1000000,
      'eur': 0
    }
  }
  const expected = {
    profitPerc: -1,
    maxProfitFiat: -30,
    fiat: 'usd',
    trades: [
      {
        symbol: 'btcusd',
        amount: 0.1,
        side: 'buy',
        // this is for debugging
        price: 18000
      },
      {
        symbol: 'iotbtc',
        amount: 10,
        side: 'buy',
        // this is for debugging
        price: 0.002
      },
      {
        symbol: 'iotusd',
        amount: 2,
        side: 'sell',
        // this is for debugging
        price: 4
      },
    ]
  }
  const result = simulateFiatMainSideFiatTrade(input)
  expect(result).toEqual(expected)
})

/**
 * Znaci imas symbole
 * provjeris bookove
 * vidi tradeove
 * uzmi u obzir cijenu, volumen i fee
 * outputaj: {profit%, maxProfitUSD, trades: [{}]}
 */