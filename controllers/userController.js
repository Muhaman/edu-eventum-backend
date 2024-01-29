'use strict';

const users = require('../models/userModel');
const authFunctions = require('../middlewares/authToken');
const crypto = require('../helpers/crypto');
const randomize = require('randomatic');
const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');
const moment = require('moment-timezone');


const addUser = async (req, res) => {
    const reqData = commonFunctions.getReqParams(req);
    try {
        reqData.password = crypto.enCrypt(reqData.password);
        let createUser = await users.create(reqData);
        createUser = createUser._doc;
        delete createUser.password;
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.SIGN_UP, createUser._doc);
    } catch (e) {
        commonFunctions.sendResponse(res, e.code, e.message, e);
    }
}

const login = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let userData = await users.findOne({email: reqData.email}).lean();
        if (!userData) {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.WRONG_EMAIL_OR_PASSWORD)
        }
        let deCryptedData = crypto.denCrypt(userData.password);
        if (deCryptedData.localeCompare(reqData.password) === 0) {
            delete userData.password;
            const tokenData = {
                id: userData._id,
                email: userData.email,
                role: userData.role
            }
            let token = await authFunctions.createToken(tokenData);
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.LOG_IN, {
                token: token,
                user: userData
            })
        } else {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.WRONG_EMAIL_OR_PASSWORD);
        }
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message);
    }
}

const getUserById = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let record = await users.findOne({_id: reqData.id}).lean();
        if (record) {
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.USER, record)
        } else {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.SUCCESS.NO_RECORD_FOUND, record)
        }
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}
const getAllUsers = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let allRecords = await users.find({}).lean();
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.USERS_LIST, allRecords);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}


const updateUser = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    const id = reqData.id;
    delete reqData.id;
    try {
        if (reqData.password)
            reqData.password = crypto.enCrypt(reqData.password);
        let updatedRecord = await users.findOneAndUpdate({_id: id}, {$set: reqData}, {returnOriginal: false}).lean();
        if (updatedRecord) {
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.USER_UPDATED, updatedRecord)
        }
        return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.RECORD_NOT_FOUND, null);

    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}
const deleteUser = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let userData = await users.findOne({_id: reqData.id}).lean();
            let deletedRecord = await users.deleteOne({_id: reqData.id});
            if (deletedRecord.deletedCount > 0) {
                return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.USER_DELETED, deletedRecord);
            }
        return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.RECORD_NOT_FOUND, null);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message)
    }
}

const forgotPassword = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let userData = await users.findOne({email: reqData.email}).lean();
        if (userData) {
                let user = await users.updateOne({email: userData.email}, {
                    $set: {
                        forgotOtp: '1234',
                        forgotOtpCreatedAt: new Date().getTime()
                    }
                });
                return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.OTP_FOR_RESET_PASSWORD);
            }
            return commonFunctions.sendResponse(res, appConstants.CODE.SERVER_ERROR, appConstants.RESPONSE_MESSAGES.FAIL.REQUEST_NOT_COMPLETED);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message);
    }
}

const resetPassword = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    if (!(reqData.email && reqData.otp && reqData.password))
        return commonFunctions.sendResponse(res, appConstants.CODE.BAD_REQUEST, appConstants.RESPONSE_MESSAGES.FAIL.MISSING_PARAMS);
    try {
        let userData = await users.findOne({email: reqData.email, forgotOtp: reqData.otp}).lean();
        if (userData && userData.forgotOtp) {
            const newTime = new Date().getTime();
            const difference = commonFunctions.miliSecondsToMins(newTime - userData.forgotOtpCreatedAt);
            if (difference <= 60) {
                reqData.password = crypto.enCrypt(reqData.password);
                await users.updateOne({email: reqData.email}, {$set: {password: reqData.password}});
                return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PASSWORD_UPDATED);
            } else {
                await users.updateOne({email: reqData.email}, {$set: {forgotOtp: 0}});
                return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.INVALID_OTP_EMAIL);
            }
        } else {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.INVALID_OTP_EMAIL);
        }
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message);
    }
}


const updatePassword = async function (req, res) {
    const reqData = commonFunctions.getReqParams(req);
    const user = req.user;
    if (!(reqData.currentPassword && reqData.newPassword))
        return commonFunctions.sendResponse(res, appConstants.CODE.BAD_REQUEST, appConstants.RESPONSE_MESSAGES.FAIL.MISSING_PARAMS);
    try {
        let userData = await users.findOne({_id: user.id}).lean();
        let deCryptedPassword = crypto.denCrypt(userData.password);
        if (deCryptedPassword.localeCompare(reqData.currentPassword) === 0) {
            await users.updateOne({_id: reqData.id}, {$set: {password: reqData.newPassword}});
            return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.PASSWORD_UPDATED);
        } else {
            return commonFunctions.sendResponse(res, appConstants.CODE.NOT_FOUND, appConstants.RESPONSE_MESSAGES.FAIL.USER_NOT_FOUND);
        }
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message);
    }
}

const logoutUser = async function (req,res) {
    const reqData = commonFunctions.getReqParams(req);
    try {
        let updatedRecord = await users.findOneAndUpdate({_id: reqData.id, fcmToken: reqData.fcmToken}, {$set: {fcmToken: null}}, {returnOriginal: false});
        return commonFunctions.sendResponse(res, appConstants.CODE.SUCCESS, appConstants.RESPONSE_MESSAGES.SUCCESS.REQUEST_COMPLETED, updatedRecord);
    } catch (e) {
        return commonFunctions.sendResponse(res, e.code, e.message);
    }
};



module.exports = {
    login: login,
    addUser: addUser,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    updatePassword: updatePassword,
    logoutUser: logoutUser,
}
