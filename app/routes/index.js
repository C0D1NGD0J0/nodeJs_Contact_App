'use strict';
let router = require('express').Router();
let {db} = require('./app/db/index');
let {UserModel} = require('./app/model/user');
let {ContactModel} = require('./app/model/contact');

router.get('/', (req, res) =>{
	res.render('pages/index', {title: 'Contactlist App'});
});

router.post('/contacts', (req, res) =>{
	let contact = new ContactModel({
		firstName: 'Elizabeth',
		lastName: 'Dolittle',
		email: 'elizabeth@example.com',
		phone: '08032145589'
	});
});

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});


module.exports = {router};