"use strict";
exports.__esModule = true;
exports.commentsSchema = exports.commentSchema = void 0;
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    userId: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    text: {
        type: String
    },
    date: {
        type: Date
    }
});
exports.commentSchema = commentSchema;
var commentsSchema = new mongoose.Schema({
    post: {
        type: mongodb_1.ObjectID, ref: 'Posts'
    },
    comments: {
        type: [commentSchema]
    }
});
exports.commentsSchema = commentsSchema;
