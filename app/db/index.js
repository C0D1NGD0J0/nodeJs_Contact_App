'use strict';
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017//ContactList');

let Contact = mongoose.model('Contact', {
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: String...
	},
	location: {

	}
});