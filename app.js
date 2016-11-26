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
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.resolve(__dirname, '/public/favicon.ico')));

// Serve app
app.get('/', (req, res) => {
	res.send('');
});

// Exports FTW
module.exports = app;
