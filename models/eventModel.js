'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;

const appConstants = require('../constants/common');

const events = new Schema({
    title: {
        type: String,
        required: true,
    },
    registration_fee: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = db.model('events', events);
