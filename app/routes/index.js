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

router.get('/contacts', auth, contactCntrl.index);

router.get('/contacts/:id', auth, contactCntrl.show);

router.post('/contacts', auth, contactCntrl.create);

router.patch('/contacts/:id', auth, contactCntrl.update);

router.delete('/contacts/:id', auth, contactCntrl.delete);

/* ===========================
USER ROUTES
============================*/
router.post('/users', userCntrl.create);

router.get('/users/me', auth, userCntrl.show);

router.post('/users/login', userCntrl.login);

router.delete('/users/me/token', auth, userCntrl.delete);

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});

module.exports = {router};