"use strict";

import { ObjectID } from "mongodb";

exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.postSchema = new mongoose.Schema({
    user: {
        type: ObjectID, ref: 'Users' 
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    date:{
        type: Date
    },
    comments:{
        type: ObjectID, ref: 'Comments' 
    }
});