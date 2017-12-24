const { memoized: getTicker } = require('./getTicker')
const delay = require('delay')

const timeout = 1

module.exports = async (pathSymbols) => {
  console.time('getting-prices')
  // const res0 = await getTicker(pathSymbols[0])
  // await delay(timeout)
  // const res1 = await getTicker(pathSymbols[1])
  // await delay(timeout)
  // const res2 = await getTicker(pathSymbols[2])
  ///
  const [res0, res1, res2] = await Promise.all([
    getTicker(pathSymbols[0]),
    getTicker(pathSymbols[1]),
    getTicker(pathSymbols[2]),
  ])
  console.timeEnd('getting-prices')
  return [res0, res1, res2]
}