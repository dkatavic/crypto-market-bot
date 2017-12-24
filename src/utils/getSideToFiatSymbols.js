const { fiats, mains } = require('../config')

const getSideToFiatSymbol = (symbols) =>
  symbols.filter((symbol) => {
    const tr1 = symbol.substring(0, 3)
    const tr2 = symbol.substring(3, 6)
    return !mains.includes(tr1) && fiats.includes(tr2)
  })

module.exports = getSideToFiatSymbol