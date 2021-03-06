const path = require('path');
const express = require('express');
const logger = require('morgan');
// Instantiate an app instance
const app = express();
/**
 * Handle static file
 * Shouldn't be needed after assets served through nginx directly :)
 */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(express.static(path.join(__dirname, './build')));
app.use(express.static(path.join(__dirname, './app')));

// Serve app
app.get('*', (req, res) => {
	if (process.env.NODE_ENV === 'dev') {
		res.sendFile(path.join(__dirname, './app/index.html'));
	} else {
		res.sendFile(path.join(__dirname, './build/index.html'));
	}
});

// Exports FTW
module.exports = app;
