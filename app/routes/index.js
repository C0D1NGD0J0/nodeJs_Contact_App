'use strict';
let router = require('express').Router();

router.get('/', (req, res) =>{
	res.render('pages/index', {title: 'Contactlist App'});
});

router.get('/contact', (req, res) =>{
	res.send(data);
});

router.get('/contact/:id', (req, res) =>{
	const data = {
		contactId: 1,
		firstName: 'John',
		lastName: 'Micheal',
		email: 'john@micheal.com',
		phone: '987234133'
	}
	res.send(data);
});

router.post('/contact', (req, res) =>{
	res.send(req.body);
});

router.put('/contact/:id', (req, res) =>{
	res.send(req.body);
});

router.delete('/contact/:id', (req, res) =>{
	res.send({message: 'Record deleted.'});
});

router.get('*', (req, res) =>{
	res.status(404).send('Page not found, enter a valid url.');
});


module.exports = router;