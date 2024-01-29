'use strict';

const events = require('../models/eventModel');
const authFunctions = require('../middlewares/authToken');
const crypto = require('../helpers/crypto');
const randomize = require('randomatic');
const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');
const moment = require('moment-timezone');


const addEvent = async (req, res) => {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let createEvent = await events.create(reqData);
        createEvent = createEvent._doc;
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.EVENT_ADDED, createEvent._doc);
    } catch (e) {
        commonFunctions.sendResponse(res, e.code, e.message, e);
    }
}
const getEventById = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let record = await events.findOne({_id: reqData.id}).lean();
        if (record) {
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.EVENT, record)
        } else {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.SUCCESS.NO_RECORD_FOUND, record)
        }
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}
const getAllEvents = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let allRecords = await events.find({}).lean();
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.EVENTS_LIST, allRecords);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}


const updateEvent = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    const id = reqData.id;
    delete reqData.id;
    try {
        let updatedRecord = await events.findOneAndUpdate({_id: id}, {$set: reqData}, {returnOriginal: false}).lean();
        if (updatedRecord) {
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.EVENTS_UPDATED, updatedRecord)
        }
        return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.RECORD_NOT_FOUND, null);

    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}
const deleteEvent = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let userData = await events.findOne({_id: reqData.id}).lean();
            let deletedRecord = await events.deleteOne({_id: reqData.id});
            if (deletedRecord.deletedCount > 0) {
                return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.EVENT_DELETED, deletedRecord);
            }
        return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.RECORD_NOT_FOUND, null);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}


module.exports = {
    addEvent:addEvent,
    updateEvent: updateEvent,
    getEventById:getEventById,
    getAllEvents: getAllEvents,
    deleteEvent: deleteEvent
}
