"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
var mongoose = require('mongoose');
exports.userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    language: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    introduction:{
        type: String
    },
});
