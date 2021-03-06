'use strict';

let mongoose = require('mongoose');
let validator = require('validator');
const jwt = require('jsonwebtoken');
let _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	return _.pick(userObject, ['id','email', 'username']);
}

UserSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'abcd12').toString();

	user.tokens.push({access, token});
	
	return user.save().then(() => {
		return token;
	});
}

UserSchema.methods.removeToken = function(token) {
	let user = this;

	return user.update({
		$pull:{
			tokens: {token}
		}
	});
};

UserSchema.statics.findByToken = function(token) {
	let User = this;
	let decoded;

	try{
		decoded = jwt.verify(token, 'abcd12')
	} catch (e){

	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function(email, password){
	let User = this;

	return User.findOne({email}).then((user) => {
		if(!user) return Promise.reject();

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) =>{
				if(res){
					resolve(user);
				} else {
					reject();
				}
			});
		})
	})
};

UserSchema.pre('save', function(next){
	let user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});


let User = mongoose.model('User', UserSchema);
module.exports = User;