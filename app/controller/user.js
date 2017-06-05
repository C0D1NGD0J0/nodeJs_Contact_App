'use strict';
const UserModel = require('../models/user');

let userCntrl = {
	create: (req, res) => {
		let body = _.pick(req.body, ['email', 'password', 'username']);
		let user = new UserModel(body);

		user.save().then(() => {
			return user.generateAuthToken();
		})
		.then((token) => {
			res.header('x-auth', token).send(user);
		})
		.catch((e) => {
			res.status(401).send(e);
		})
	}
}

module.exports = userCntrl;