'use strict';
let http = require('http');
const PORT = 3000;

let server = http.createServer(function(req, res){
	res.end('Testing Connection');
});

server.listen(PORT, () =>{
	console.log('Server is online');
});