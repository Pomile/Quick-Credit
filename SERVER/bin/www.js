#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http';
import debug from 'debug';
import db from '../src/models/index';
import app from '../server';
import '@babel/polyfill';

/**
 * Create HTTP server.
*/

const { models } = db;
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (typeof port === 'number' && port >= 0) {
    // named pipe
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = async () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    let retries = 5;
    while (retries) {
      try {
        models.sync({ force: false });
        break;
      } catch (err) {
        debug.log(err);
        retries -= 1;
        setTimeout(() => debug.log(`${retries} retries left`, 500));
      }
    }

    debug.log(`Server is listening on http://localhost:${port}/`);
  }
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
