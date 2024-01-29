'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;

const appConstants = require('../constants/common');

const ROLES_LIST = appConstants.ROLES_LIST;

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    forgotOtp: {
        type: Number
    },
    forgotOtpCreatedAt: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = db.model('user', user);
