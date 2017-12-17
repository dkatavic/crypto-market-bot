const { jumpToFiat, jumpToMain, mainToFiat } = require('./examples')
const getSideToFiatSymbol = require('../getSideToFiatSymbol')

test('it should get Main Crypto to Fiat Symbol', () => {
  const input = [
    ...jumpToFiat,
    ...jumpToMain,
    ...mainToFiat
  ]

  const result = getSideToFiatSymbol(input)
  expect(result).toEqual(jumpToFiat)
})