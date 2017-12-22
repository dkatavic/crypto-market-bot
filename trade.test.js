const {simulateFiatMainSideFiatTrade} = require('./trade')

test('Simulate trade from fiat->main->side->fiat', () => {
  const input = {
    symbols: ['btcusd', 'iotbtc', 'iotusd'],
    orderBooks: {
      'btcusd': {
        bids: [
          {
            "price": "11887",
            "amount": "0.1519",
            "timestamp": "1513951110.0",
          },
          {
            "price": "11842",
            "amount": "2.74949375",
            "timestamp": "1513951110.0",
          },
          {
            "price": "11840",
            "amount": "0.62",
            "timestamp": "1513951110.0",
          },
        ],
        asks: [
          {
            "price": "11892",
            "amount": "1.58993038",
            "timestamp": "1513951110.0",
          },
          {
            "price": "11895",
            "amount": "0.05",
            "timestamp": "1513951110.0",
          },
          {
            "price": "11897",
            "amount": "0.00409",
            "timestamp": "1513951110.0",
          },
        ],
      },
    },
    fiatBallance,
  }
})
