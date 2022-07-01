"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
exports.__esModule = true;
exports.orderSchema = void 0;
var mongoose = require('mongoose');
var qaAnswerScoresSchema = require("./qaAnswerScoreSchema")

const qaanswerSchema = new mongoose.Schema({
    userId: {
        type: mongodb_1.ObjectID, ref: 'Users'
    },
    text: {
        type: String
    },
    date: {
        type: Date
    },
    scoresId:{
        //type : qaAnswerScoresSchema
        type: mongodb_1.ObjectID, ref: 'QAAnswerScores'
    },

    totalscorer: {
        type: Number
    },
    totalscore: {
        type: Number
    }
});


const qaanswerSetSchema = new mongoose.Schema({
    post: {
        type: mongodb_1.ObjectID, ref: 'QAPosts'
    },
    answers: {
        type: [mongodb_1.ObjectID]
    },
});

export {qaanswerSchema, qaanswerSetSchema};