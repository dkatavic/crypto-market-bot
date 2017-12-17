const { jumpToFiat, jumpToMain, mainToFiat } = require('./examples')
const getSideToMainSymbol = require('../getSideToMainSymbol')

test('it should get Main Crypto to Fiat Symbol', () => {
  const input = [
    ...jumpToFiat,
    ...jumpToMain,
    ...mainToFiat
  ]

  const result = getSideToMainSymbol(input)
  expect(result).toEqual(jumpToMain)
})