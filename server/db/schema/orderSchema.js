"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
exports.orderSchema = new mongoose.Schema({
    user: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    ken3Amount: {
        type: String
    },
    ken5Amount: {
        type: String
    },
    receiverName: {
        type: String
    },
    receiverAddress: {
        type: String
    },
    receiverPhone: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    date: {
        type: Date
    }
});
