'use strict';

const payment = require('../models/paymentModel');
const authFunctions = require('../middlewares/authToken');
const crypto = require('../helpers/crypto');
const randomize = require('randomatic');
const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');
const moment = require('moment-timezone');


const addPayment = async (req, res) => {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let createPayment = await payment.create(reqData);
        createPayment = createPayment._doc;
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PAYMENT_ADDED, createPayment._doc);
    } catch (e) {
        commonFunctions.sendResponse(res, e.code, e.message, e);
    }
}
const getPaymentById = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let record = await payment.findOne({_id: reqData.id}).lean();
        if (record) {
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PAYMENT, record)
        } else {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.SUCCESS.NO_RECORD_FOUND, record)
        }
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}
const getAllPayments = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let allRecords = await payment.find({}).lean();
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PAYMENTS_LIST, allRecords);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}


const updatePayment = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    const id = reqData.id;
    delete reqData.id;
    try {
        let updatedRecord = await payment.findOneAndUpdate({_id: id}, {$set: reqData}, {returnOriginal: false}).lean();
        if (updatedRecord) {
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PAYMENTS_UPDATED, updatedRecord)
        }
        return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.RECORD_NOT_FOUND, null);

    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}
const deletePayment = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let userData = await payment.findOne({_id: reqData.id}).lean();
            let deletedRecord = await payment.deleteOne({_id: reqData.id});
            if (deletedRecord.deletedCount > 0) {
                return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PAYMENT_DELETED, deletedRecord);
            }
        return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.RECORD_NOT_FOUND, null);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}


module.exports = {
    addPayment:addPayment,
    updatePayment: updatePayment,
    getPaymentById:getPaymentById,
    getAllPayments: getAllPayments,
    deletePayment: deletePayment
}
