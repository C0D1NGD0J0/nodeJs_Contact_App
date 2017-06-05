'use strict';
let router = require('express').Router();
let {mongoose} = require('../db/index');
let {auth} = require('../config/auth');
let contactCntrl = require('../controller/contact');
let userCntrl = require('../controller/user');
const {ObjectID} = require('mongodb');
let _ = require('lodash');

router.get('/', (req, res) =>{
	res.render('pages/index', {title: 'Contactlist App'});
});

router.get('/contacts', contactCntrl.index);

router.get('/contacts/:id', contactCntrl.show);

router.post('/contacts', contactCntrl.create);

router.patch('/contacts/:id', contactCntrl.update);

router.delete('/contacts/:id', contactCntrl.delete);

/* ===========================
USER ROUTES
============================*/
router.post('/users', userCntrl.create);

router.post('/users/login', userCntrl.login);

router.get('/users/me', auth, (req, res) => {
	res.send(req.user);
});

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});

module.exports = {router};