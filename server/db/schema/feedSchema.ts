"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.feedSchema = new mongoose.Schema({
    receiver: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    post: {
        type: mongodb_1.ObjectID, ref: 'Posts'
    },

    date: {
        type: Date
    }
});
