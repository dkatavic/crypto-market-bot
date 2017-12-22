const { jumpToFiat, jumpToMain, mainToFiat } = require('./examples')
const getMainToFiatSymbol = require('../getMainToFiatSymbol')

test('it should get Main Crypto to Fiat Symbol', () => {
  const input = [
    ...jumpToFiat,
    ...jumpToMain,
    ...mainToFiat
  ]

  const result = getMainToFiatSymbol(input)
  expect(result).toEqual(mainToFiat)
})