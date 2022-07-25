"use strict";
exports.__esModule = true;
exports.qaanswerSetSchema = exports.qaanswerSchema = void 0;
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
var qaAnswerScoresSchema = require("./qaAnswerScoreSchema");
var qaanswerSchema = new mongoose.Schema({
    userId: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    text: {
        type: String
    },
    date: {
        type: Date
    },
    scoresId: {
        //type : qaAnswerScoresSchema
        type: mongodb_1.ObjectID, ref: 'QAAnswerScores'
    },
    totalScorer: {
        type: Number
    },
    totalScore: {
        type: Number
    }
});
exports.qaanswerSchema = qaanswerSchema;
var qaanswerSetSchema = new mongoose.Schema({
    post: {
        type: mongodb_1.ObjectID, ref: 'QAPosts'
    },
    answers: {
        type: [mongodb_1.ObjectID]
    }
});
exports.qaanswerSetSchema = qaanswerSetSchema;
