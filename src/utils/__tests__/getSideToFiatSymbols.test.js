const { jumpToFiat, jumpToMain, mainToFiat } = require('./fixtures/example-symbols')
const getSideToFiatSymbols = require('../getSideToFiatSymbols')

test('it should get Main Crypto to Fiat Symbol', () => {
  const input = [
    ...jumpToFiat,
    ...jumpToMain,
    ...mainToFiat,
  ]

  const result = getSideToFiatSymbols(input)
  expect(result).toEqual(jumpToFiat)
})