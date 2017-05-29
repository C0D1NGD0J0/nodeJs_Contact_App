'use strict';
let router = require('express').Router();

router.get('/', (req, res) =>{
	res.render('pages/index', {title: 'Contactlist App'});
});

router.get('/api/member', (req, res) =>{
	res.send('Member index page');
});

router.get('/api/member/profile', (req, res) =>{
	res.send('Member profile page');
});

router.get('/api/admin', (req, res) =>{
	res.send('Admin Page');
});

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});


module.exports = router;