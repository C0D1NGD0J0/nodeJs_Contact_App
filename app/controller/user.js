'use strict';
const {User} = require('../models/user');
const {ObjectID} = require('mongodb');
let _ = require('lodash');

let userCntrl = {
	create: (req, res) => {
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
	},

	login: (req, res) => {
		let body = _.pick(req.body, ['email', 'password']);
		User.findByCredentials(body.email, body.password).then((user) => {
			return user.generateAuthToken().then((token) => {
				res.header('x-auth', token).send(user);
			});
		}).catch((e) => {
			res.status(400).send(e);
		});
	}
}

module.exports = userCntrl;