"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    text: {
        type: String
    },
    date: {
        type: Date
    },
    /*comments:{
        type : [commentsSchema]
    }*/
});


const commentsSchema = new mongoose.Schema({
    post: {
        type: mongodb_1.ObjectID, ref: 'Posts'
    },
    comments: {
        type: [commentSchema]
    },
});

export {commentSchema, commentsSchema};