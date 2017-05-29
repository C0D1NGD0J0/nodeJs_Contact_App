'use strict';
let express = require('express');
let app = express();
let url = require('url');

const port = 3000;

app.get('/', (req, res) =>{
	res.send('Testing testing express...');
});

app.listen(port, () =>{
	console.log('Server is live');
});