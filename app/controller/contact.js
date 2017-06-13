'use strict';
const Contact = require('../models/contact');
const {ObjectID} = require('mongodb');
let _ = require('lodash');

let contactCntrl = {
	index: (req, res) => {
		Contact.find({_creator: req.user._id}).then((contacts) => {
			res.send({contacts});
		}, (e) => {
			res.status(400).send(e);
		});
	},

	show: (req, res) => {
		let id = req.params.id;
		if(!ObjectID.isValid(id)){
			return res.status(404).send();
		}

		Contact.findOne({_id: id, _creator: req.user._id}).then((contact) => {
			if(!contact){
				return res.status(404).send();
			}
			res.send({contact});
		}).catch((e) => {
			res.status(400).send()
		});
	},

	create: (req, res) =>{
		let contact = new Contact({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			_creator: req.user._id
		});

		contact.save().then((contact) => {
			res.send(contact);
		}, (e) => {
			res.status(400).send(e);
		});
	},

	update: (req, res) => {
		let id = req.params.id;
		let body = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			_creator: req.user._id
		}

		if(!ObjectID.isValid(id)){
			return res.status(404).send();
		}

		Contact.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((contact) => {
			if(!contact){
				return res.status(400).send();
			}
			res.send({contact});
		}).catch((e) => {
			res.status(400).send();
		});
	},

	delete: (req, res) => {
		let id = req.params.id;
		if(!ObjectID.isValid(id)){
			return res.status(404).send();
		}
		Contact.findOneAndRemove({_id: id, _creator: req.user.id}).then((contact) => {
			if(!contact){
				return res.status(400).send();
			}
			res.send(contact);
		}).catch((e) => {
			res.status(400).send();
		});
	}
}

module.exports = contactCntrl;