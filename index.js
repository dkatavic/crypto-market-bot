const getTicker = require('./getTicker')
const getTickers = require('./getTickers')
const delay = require('delay')
const _ = require('lodash')
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
    await delay(1000)
  }

  // const calcs = paths.map(async (path) => {
  //   console.log('TICK', path)
  //   const diff = await getDiff(path)
  //   console.log(`${path} : ${diff}%`)
  //   return
  // })
  // await Promise.all(calcs)
  // return
  // const diff = await getDiff()
  // console.log(`getDiff: ${diff}`)
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
  // console.log(mainusd, jumpMain, jumpUsd)
  // before
  // const diff = (1 / mainusd.mid / jumpMain.mid * jumpUsd.mid - 1) * 100



  // usd -> main -> jump -> usd
  const diff1 = (1 / mainusd.ask / jumpMain.ask * jumpUsd.bid - 1) * 100

  // usd -> jump -> main -> usd
  const diff2 = (1 / jumpUsd.ask * jumpMain.ask * mainusd.bid - 1) * 100

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