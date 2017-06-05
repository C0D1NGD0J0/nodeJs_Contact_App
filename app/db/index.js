'use strict';
let mongoose = require('mongoose');
let seedDB = require('./seed');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ContactList');


module.exports = {mongoose};