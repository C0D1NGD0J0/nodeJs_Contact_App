'use strict';
let mongoose = require('mongoose');
let validator = require('validator');

let Contact = mongoose.model('Contact', {
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: [3, 'Name is too short'],
		maxlength: [15, 'Name is too long']
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		minlength: [3, 'Name is too short'],
		maxlength: [15, 'Name is too long']
	},
	email: {
		type: String
	},
	phone: {
		type: String,
		trim: true,
		maxlength: [15, 'The `{VALUE}` exceeds the max allowed length of `{MAXLENGTH}`'],
		minlength: [8, 'The number `{VALUE}` is below the min allowed length of `{MAXLENGTH}`'],
		unique: true
	}
});

module.exports = {Contact};