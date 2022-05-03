"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.postSchema = new mongoose.Schema({
    user: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    date: {
        type: Date
    },
    comments:{
        type: mongodb_1.ObjectID, ref: 'Comments' 
    }
});
