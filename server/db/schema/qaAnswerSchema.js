"use strict";
exports.__esModule = true;
exports.qaanswersSchema = exports.qaanswerSchema = void 0;
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
        //type: qaAnswerScoresSchema
        type: mongodb_1.ObjectID, ref: 'QAAnswerScores'
    }
    /*comments:{
        type : [commentsSchema]
    }*/
});
exports.qaanswerSchema = qaanswerSchema;
var qaanswersSchema = new mongoose.Schema({
    post: {
        type: mongodb_1.ObjectID, ref: 'QAPosts'
    },
    answers: {
        type: [qaanswerSchema]
    }
});
exports.qaanswersSchema = qaanswersSchema;
