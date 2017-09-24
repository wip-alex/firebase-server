const functions = require('firebase-functions')
const next = require('next')
const setupGraphQLServer = require('./graphql/server')

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer()

// https://us-central1-<project-name>.cloudfunctions.net/api
// exports.api = functions.https.onRequest(graphQLServer)


var dev = process.env.NODE_ENV === 'development'
var app = next({ dev, conf: { distDir: 'next' } })
var handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log('next: ' + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => {
    if(req.originalUrl === '/api/graphql') graphQLServer;
    handle(req, res)
  })
})
