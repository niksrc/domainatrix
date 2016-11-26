const path = require('path');
const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
// Instantiate an app instance
const app = express();
/**
 * Handle static file
 * Shouldn't be needed after assets served through nginx directly :)
 */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.resolve(__dirname, '/public/favicon.ico')));

// Serve app
app.get('/', (req, res) => {
	if (process.env.NODE_ENV === 'dev') {
		res.send('./app/index.html');
	} else {
		res.send('./build/index.html');
	}
});

// Exports FTW
module.exports = app;
