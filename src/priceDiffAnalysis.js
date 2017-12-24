const { getPaths } = require('./getPaths')
const delay = require('delay')
const fs = require('fs')
const { simulate: simulateTrade } = require('./trade')

// get all symbols
// iterate over symbols
// write result to JSON file

const stateFile = './result.json'
try {
  var startingState = JSON.parse(fs.readFileSync(stateFile))
} catch (e) {
  console.error(e)
}

const iterateeOverSymbolPaths = async (symbolPaths) => {
  const state = startingState || []
  let i = 0
  do {
    try {
      console.log(`Getting ${symbolPaths[i]} symbols`)
      const { fiatMainSideFiat, fiatSideMainFiat } = await simulateTrade(symbolPaths[i])
      console.log(fiatMainSideFiat)
      console.log(fiatSideMainFiat)
      state.push(fiatMainSideFiat, fiatSideMainFiat)
      fs.writeFileSync(stateFile, JSON.stringify(state, null, 2))
      // wait for 10s before next call. RATE_LIMIT is [10, 60] depending on load
      await delay(10 * 1000)
    } catch (e) {
      // this i probably RATE_LIMIT error. They dinamicly change rate limit under load
      // wait for 3 min and then start again
      console.log(`Error ${e.message}. Delaying for 3 minutes`)
      await delay(3 * 60 * 1000)
    }
    i++
    i = i % symbolPaths.length
    // loop forever
  } while (i > -1)
}

iterateeOverSymbolPaths(getPaths())
  .then(() => {
    console.log('DONE')
  })
  .catch(console.error)