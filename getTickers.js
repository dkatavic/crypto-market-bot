const { memoized: getTicker } = require('./getTicker')
const delay = require('delay')

const timeout = 1000

module.exports = async (pathSymbols) => {
  const res0 = await getTicker(pathSymbols[0])
  await delay(timeout)
  const res1 = await getTicker(pathSymbols[1])
  await delay(timeout)
  const res2 = await getTicker(pathSymbols[2])
  await delay(timeout)
  return [res0, res1, res2]
}