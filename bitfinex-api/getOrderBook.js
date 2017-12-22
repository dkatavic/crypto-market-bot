const request = require('request-promise')
const { url: { v1 } } = require('../config')

const getOrderBook = (symbol, qs = { limit_bids: 10, limit_asks: 10 }) =>
  request.get({
    uri: v1 + `/book/${symbol}`,
    json: true,
    qs
  })


module.exports = getOrderBook
