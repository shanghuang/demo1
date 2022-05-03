const mongoose = require('mongoose');

export const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    language: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    introduction:{
        type: String
    },
});
