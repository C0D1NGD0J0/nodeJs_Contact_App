'use strict';
let router = require('express').Router();
let {mongoose} = require('../db/index');
let {User} = require('../models/user');
let {Contact} = require('../models/contact');
let {auth} = require('../config/auth');
const {ObjectID} = require('mongodb');
let _ = require('lodash');

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
	let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'phone']);
	let contact = new Contact(body);

	contact.save().then((contact) => {
		res.send(contact);
	}, (e) => {
		res.status(400).send(e);
	});
});

router.patch('/contacts/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'phone']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Contact.findByIdAndUpdate(id, {$set: body}, {new: true}).then((contact) => {
		if(!contact){
			return res.status(400).send();
		}
		res.send({contact});
	}).catch((e) => {
		res.status(400).send();
	})
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

/* ===========================
USER ROUTES
============================*/
router.post('/users', (req, res) => {
	let body = _.pick(req.body, ['email', 'password', 'username']);
	let user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	})
	.then((token) => {
		res.header('x-auth', token).send(user);
	})
	.catch((e) => {
		res.status(401).send(e);
	})
});

router.get('/users/me', auth, (req, res) => {
	res.send(req.user);
});

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});

module.exports = {router};