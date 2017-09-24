const functions = require('firebase-functions')
const next = require('next')

var dev = process.env.NODE_ENV !== 'production'
var app = next({ dev, conf: { distDir: 'next' } })
var handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log('next: ' + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})

exports.api = functions.https.onRequest((req, res) => {
  console.log('api: ' + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})
