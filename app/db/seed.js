// 'use strict';
// const {ObjectID} = require('mongodb');
// const mongoose = require('./index');
// const jwt = require('jsonwebtoken');
// const {User} = require('../models/user');

// let Oid = new ObjectID();
// let Oid2 = new ObjectID();
// let Oid3 = new ObjectID();
// let Oid4 = new ObjectID();

// const users = [{
// 	_id: Oid,
// 	email: 'user1@example.com',
// 	username: 'userOne',
// 	password: 'password',
// 	token: [{
// 		access: 'auth',
// 		token: jwt.sign({_id: Oid, access: 'auth'}, 'abcd12').toString()
// 	}]
// }, {
// 	_id: Oid2,
// 	email: 'user2@example.com',
// 	username: 'userTwo',
// 	password: 'abc1234',
// 	token: [{
// 		access: 'auth',
// 		token: jwt.sign({_id: Oid, access: 'auth'}, 'abcd12').toString()
// 	}]
// },{
// 	_id: Oid3,
// 	email: 'user3@example.com',
// 	username: 'userThree',
// 	password: 'def5678',
// 	token: [{
// 		access: 'auth',
// 		token: jwt.sign({_id: Oid3, access: 'auth'}, 'abcd12').toString()
// 	}]
// },{
// 	_id: Oid4,
// 	email: 'user4@example.com',
// 	username: 'userFour',
// 	password: 'passport',
// 	token: [{
// 		access: 'auth',
// 		token: jwt.sign({_id: Oid4, access: 'auth'}, 'abcd12').toString()
// 	}]
// }
// ]

// let populateUser = {
// 	dbClear: () => {
// 		User.remove({}).then(() => {
// 			console.log('DB cleared');
// 		}).catch((err) => {
// 			console.log(err);
// 		});
// 	},
// 	seedDB: () => {
// 		for(let user of users){
// 			let newUser  = new User(user);
// 			newUser.save();
// 		}
// 		console.log("Database seed completed")
// 	}
// }

// module.exports = {populateUser};