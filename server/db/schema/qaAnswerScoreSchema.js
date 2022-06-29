"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');

var qaAnswerScoreSchema = new mongoose.Schema({
    userId: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    text: {
        type: String
    },
    score: {
        type: Number
    },
    date: {
        type: Date
    }
});
exports.qaAnswerScoreSchema = qaAnswerScoreSchema;
exports.qaAnswerScoresSchema = new mongoose.Schema({
    qaAnswer: {
        type: mongodb_1.ObjectID, ref: 'QAAnswer'
    },
    scores: {
        type: [qaAnswerScoreSchema]
    },
    totalscorer: {
        type: Number
    },
    totalscore: {
        type: Number
    }
});


//export {qaAnswerScoreSchema, qaAnswerScoresSchema};