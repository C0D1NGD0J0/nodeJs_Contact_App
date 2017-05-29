'use strict';
let url = require('url');
let express = require('express');
let app = express();
let morgan = require('morgan'); //logs all web traffic to the app
let router = require('./app/routes');

const port = (process.env.PORT || 3000);

app.set('view engine', 'ejs'); //set view engine to render dynamic content using EJS
app.use(express.static(__dirname + '/public')); // serves static files e.g css/js/images
app.use(morgan('short'));
app.use('/', router);

app.listen(port, () =>{
	console.log('Server is live');
});