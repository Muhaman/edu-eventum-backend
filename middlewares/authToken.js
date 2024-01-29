'use strict';
const commonFunctions = require('../helpers/commonFunctions');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const appConstants = require('../constants/common');
const config = require('../config/config.js');

const createToken = (userData) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.sign(userData, config.ACCESS_TOKEN_SECRET, function (err, token) {
                if (err) {
                    commonFunctions.consoleLog('JWT SIGN ERROR', err);
                    reject(err)
                } else {
                    commonFunctions.consoleLog('JWT SIGN', token);
                    resolve(token)
                }
            });
        })
    } catch (e) {
        commonFunctions.consoleLog('Error jwt :', e);
    }
}

const authenticateToken = (req, res, next) => {
    try {
        commonFunctions.consoleLog('JWT authentication :', `${req.method} ${req.url}`);
        if (appConstants.IGNORE_MIDDLEWARE_URLS.includes(req.url) || appConstants.IGNORE_MIDDLEWARE_URLS.includes(req.url.split('/')[1]+'/'+req.url.split('/')[2])) {
            next();
        } else {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token === null) return commonFunctions.sendResponse(res, appConstants.CODE.UNAUTHORIZED, appConstants.RESPONSE_MESSAGES.FAIL.UNAUTHORIZED);
            jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, user) => {
                if (err) return commonFunctions.sendResponse(res, appConstants.CODE.UNAUTHORIZED, appConstants.RESPONSE_MESSAGES.FAIL.UNAUTHORIZED);
                let data = await users.findOne({email: user.email}).lean();
                if (data) {
                    req.user = user;
                    next();
                } else {
                    return commonFunctions.sendResponse(res, appConstants.CODE.UNAUTHORIZED, appConstants.RESPONSE_MESSAGES.FAIL.UNAUTHORIZED);
                }
            })
        }
    } catch (e) {
        commonFunctions.consoleLog('Error jwt authentication :', e);
    }
}

const validateUser = (req, res, next) => {
    let data = users.findOne({email: req.body.email, logInStatus: true}).lean();
    if (data) {
        next();
    } else {
        return commonFunctions.sendResponse(res, appConstants.CODE.UNAUTHORIZED, appConstants.RESPONSE_MESSAGES.FAIL.UNAUTHORIZED);
    }
}

module.exports = {
    createToken: createToken,
    authenticateToken: authenticateToken,
    validateUser: validateUser
}
