'use strict';
let url = require('url');
let express = require('express');
let app = express();
let morgan = require('morgan'); //logs all web traffic to the app
let router = require('./app/routes');

const port = process.env.PORT || 3000;

app.use(morgan('short'));
app.use('/', router);

app.listen(port, () =>{
	console.log('Server is live');
});