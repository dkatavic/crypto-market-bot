const { jumpToFiat, jumpToMain, mainToFiat } = require('./fixtures/example-symbols')
const getMainToFiatSymbols = require('../getMainToFiatSymbols')

test('it should get Main Crypto to Fiat Symbol', () => {
  const input = [
    ...jumpToFiat,
    ...jumpToMain,
    ...mainToFiat,
  ]

  const result = getMainToFiatSymbols(input)
  expect(result).toEqual(mainToFiat)
})