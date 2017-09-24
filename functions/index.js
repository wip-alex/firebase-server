'use strict';

var functions = require('firebase-functions');
var next = require('next');
var setupGraphQLServer = require('./graphql/server');

/* CF for Firebase with graphql-server-express */
var graphQLServer = setupGraphQLServer();

// https://us-central1-<project-name>.cloudfunctions.net/api
// exports.api = functions.https.onRequest(graphQLServer)


var dev = process.env.NODE_ENV === 'development';
var app = next({ dev: dev, conf: { distDir: 'next' } });
var handle = app.getRequestHandler();

exports.next = functions.https.onRequest(function (req, res) {
  console.log('next: ' + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(function () {
    if (req.originalUrl === '/api/graphql') graphQLServer;
    handle(req, res);
  });
});