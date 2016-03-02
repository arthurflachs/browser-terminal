#!/usr/bin/env node
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var WebpackDevMiddleware = require('webpack-dev-middleware')
var WebpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.config.js')

var app = express()
var compiler = webpack(config)

app.use(WebpackDevMiddleware(compiler, {
  stats: { colors: true },
  noInfo: true,
  publicPath: config.output.publicPath,
}))
app.use(WebpackHotMiddleware(compiler))

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'index.html')))

var port = 12345

app.listen(port, err => {
  if (err) {
    console.log(err)
  }

  console.log(`Dev server available on port 12345`)
})
