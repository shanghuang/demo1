"use strict";

import { ObjectID } from "mongodb";

exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.qapostSchema = new mongoose.Schema({
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
    answers:{
        type: ObjectID, ref: 'QAAnswers' 
    }
});