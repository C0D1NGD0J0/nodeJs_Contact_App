'use strict';
let router = require('express').Router();
let {db} = require('../db/index');
let {User} = require('../model/user');
let {Contact} = require('../model/contact');
let {ObjectID} = require('mongodb');

router.get('/', (req, res) =>{
	res.render('pages/index', {title: 'Contactlist App'});
});

router.get('/contacts', (req, res) => {
	Contact.find().then((contacts) => {
		res.send({contacts});
	}, (e) => {
		res.status(400).send(e);
	});
});

router.get('/contacts/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Contact.findById(id).then((contact) => {
		if(!contact){
			return res.status(404).send();
		}
		res.send({contact});
	}).catch((e) => {
		res.status(400).send()
	});
});

router.post('/contacts', (req, res) =>{
	let contact = new Contact({
		firstName: 'Elizabeth',
		lastName: 'Dolittle',
		email: 'elizabeth@example.com',
		phone: '08032145589'
	});

	contact.save().then((contact) => {
		res.send(contact);
	}, (e) => {
		res.status(400).send(e);
	});
});

router.delete('/contacts/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Contact.findByIdAndRemove(id).then((contact) => {
		if(!contact){
			return res.status(400).send();
		}
		res.send(contact);
	}).catch((e) => {
		res.status(400).send();
	});
});

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});


module.exports = {router};