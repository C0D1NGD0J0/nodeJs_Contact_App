'use strict';
let mongoose = require('mongoose');
let validator = require('validator');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
		unique: true,
		isAsync: false,
		validate: {
			validator: (value) => {
				return validator.isEmail(value)
			},
			message: '{VALUE} is not a valid email'
		}
	},
	
	username: {
		type: String,
		unique: true,
		minlength: 5,
		maxlength: 10,
		trim: true,
		required: true
	},

	password: {
		type: String,
		minlength: 6,
		required: true,
		trim: true
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

UserSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'abcdef').toString();

	user.tokens.push({access, token});
	
	return user.save().then(() => {
		return token;
	});
}

let User = mongoose.model('User', UserSchema);

module.exports = {User};