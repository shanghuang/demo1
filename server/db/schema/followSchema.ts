"use strict";

import { ObjectID } from "mongodb";

exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.followSchema = new mongoose.Schema({
    follower: {
        type: ObjectID, ref: 'Users' 
    },
    followee: {
        type: ObjectID, ref: 'Users' 
    },
});