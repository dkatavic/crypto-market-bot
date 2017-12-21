const getTickers = require('./getTickers')
const delay = require('delay')
const _ = require('lodash')
const chalk = require('chalk');
const { getPaths } = require('./getPaths')
const { paths } = require('./config');



const main = async () => {
  const paths = getPaths()
  console.log(`paths: ${JSON.stringify(paths)}`)

  for (var i = 0; i < paths.length; i++) {
    let path = paths[i]
    console.log('Getting: ', path)
    const diff = await getDiff(path)
    console.log(`${path} : ${diff.fromMain}%`)
    console.log(`${_.reverse(path)} : ${diff.fromJump}%`)
    if (diff.fromMain > 1) {
      console.log(chalk.green.bold(`${path} is PROFITABLE: ${diff.fromMain}`))
    } else if (diff.fromMain > 0.2) {
      console.log(chalk.yellow.bold(`${path} is Prof for big ones: ${diff.fromMain}`))
    }
    if (diff.fromJump > 1) {
      console.log(chalk.green.bold(`${_.reverse(path)} is PROFITABLE: ${diff.fromJump}`))
    } else if (diff.fromJump > 0.2) {
      console.log(chalk.yellow.bold(`${_.reverse(path)} is Prof for big ones: ${diff.fromJump}`))
    }
    await delay(1000)
  }
}

const getDiff = async (pathSymbols) => {
  // const [btcusd, iotbtc, iotusd] = await Promise.all(symbols.map(symbol => getTicker(symbol)))
  // mainusd: ['btcusd', 'ethusd']
  // jumpMain: ['iotbtc']
  // jumpUsd: ['iotusd']
  const [mainusd, jumpMain, jumpUsd] = await getTickers(pathSymbols)
  // 1$ / btcusd = btc    /// btc/usd = btcusd 
  // btc / iotbtc = iota
  // iota * iotusd = usd

  // usd -> main -> jump -> usd
  const diff1 = (1 / mainusd.ask / jumpMain.ask * jumpUsd.bid - 1) * 100

  // usd -> jump -> main -> usd
  // is this wrong or below one?
  // const diff2 = (1 / jumpUsd.ask * jumpMain.ask * mainusd.bid - 1) * 100
  const diff2 = (1 / jumpUsd.ask * jumpMain.bid * mainusd.bid - 1) * 100

  return {
    fromMain: diff1,
    fromJump: diff2
  }
}



main().then(() => {
  console.log('DONE --- ')
  process.exit(0)
})
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })