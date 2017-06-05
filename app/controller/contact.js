'use strict';
const ContactModel = require('../models/contact');

let contactCntrl = {
	index: (req, res) => {
		ContactModel.find().then((contacts) => {
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

		ContactModel.findById(id).then((contact) => {
			if(!contact){
				return res.status(404).send();
			}
			res.send({contact});
		}).catch((e) => {
			res.status(400).send()
		});
	},

	create: (req, res) =>{
		let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'phone']);
		let contact = new ContactModel(body);

		contact.save().then((contact) => {
			res.send(contact);
		}, (e) => {
			res.status(400).send(e);
		});
	},

	update: (req, res) => {
		let id = req.params.id;
		let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'phone']);

		if(!ObjectID.isValid(id)){
			return res.status(404).send();
		}

		ContactModel.findByIdAndUpdate(id, {$set: body}, {new: true}).then((contact) => {
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
		ContactModel.findByIdAndRemove(id).then((contact) => {
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