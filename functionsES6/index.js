const functions = require('firebase-functions')
const next = require('next')
const setupGraphQLServer = require('./graphql/server')

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer()
const dev = process.env.NODE_ENV === 'development'
const app = next({ dev, conf: { distDir: 'next' } })
const handle = app.getRequestHandler()

// https://us-central1-<project-name>.cloudfunctions.net/api
exports.api = functions.https.onRequest(graphQLServer)

exports.next = functions.https.onRequest((req, res) => {
  console.log('next: ' + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => {
    handle(req, res)
  })
})
