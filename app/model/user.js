'use strict';
let mongoose = require('mongoose');
let validator = require('validator');

let User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value)
			},
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		minlength: 6,
		required: true
	},
	tokens:[{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

module.exports = {User};