"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.followSchema = new mongoose.Schema({
    follower: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    followee: {
        type: mongodb_1.ObjectID, ref: 'Users'
    }
});
