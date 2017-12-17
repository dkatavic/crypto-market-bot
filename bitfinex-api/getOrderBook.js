const request = require('request-promise')
const { url: { v1 } } = require('../config')

const getOrderBook = (symbol, qs = { limit_bids: 1, limit_asks: 1 }) =>
  request.get({
    uri: v1 + `/book/${symbol}`,
    json: true,
    qs
  })


module.exports = getOrderBook