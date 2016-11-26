#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require('http');
const debug = require('debug')('dfw:server');
const app = require('./app');

// Load env vars
require('dotenv').load();
var browserSync = require('browser-sync');

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '1337';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(port + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(port + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	if (process.env.NODE_ENV === 'dev') {
		browserSync({
			proxy: 'localhost:' + port,
			files: ['app/**/*.{js,css,html}']
		});
	}
	const addr = server.address();
	debug('Server started listening ' + addr.port);
}

