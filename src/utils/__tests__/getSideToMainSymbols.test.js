const { jumpToFiat, jumpToMain, mainToFiat } = require('./fixtures/example-symbols')
const getSideToMainSymbols = require('../getSideToMainSymbols')

test('it should get Main Crypto to Fiat Symbol', () => {
  const input = [
    ...jumpToFiat,
    ...jumpToMain,
    ...mainToFiat,
  ]

  const result = getSideToMainSymbols(input)
  expect(result).toEqual(jumpToMain)
})