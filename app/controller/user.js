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
		}).then((token) => {
			res.header('x-auth', token).send(user);
		}).catch((e) => {
			res.status(401).send(e);
		});
	},

	show: (req, res) => {
		res.send(req.user);
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
	},

	delete: (req, res) => {
		req.user.removeToken(req.token).then(() => {
			res.status(200).send();
		}, () => {
			res.status(400).send();
		});
	}
}

module.exports = userCntrl;