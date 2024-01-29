'use strict'
const appConstants = require('../constants/common');
const config = require('../config/config.js');

const moment = require('moment-timezone');

const sendResponse = (res, code, message = null, data = null) => {
    if (data && data.code == 11000 && data.keyPattern && data.keyValue) {
        const keyPatternKeys = Object.keys(data.keyPattern);
        const keyValueKeys = Object.keys(data.keyValue);
        message = `${keyPatternKeys[0]} ${data.keyValue[keyValueKeys[0]]} ${appConstants.RESPONSE_MESSAGES.FAIL.ALREADY_EXISTS}`;
    } else if (data && data.code == 11000 && data.writeErrors) {
        message = appConstants.RESPONSE_MESSAGES.FAIL.BULK_DUPLICATE;
    } else if (code == 'ObjectId') {
        message = appConstants.RESPONSE_MESSAGES.FAIL.OBJECT_ID_CAST;
    }
    res.status(getHTTPStatusCode(code)).json({status: getStatusTrueFalse(code), message, data});
};

const getHTTPStatusCode = (code) => {
    if (code == appConstants.CODE.SUCCESS || code == appConstants.CODE.NOT_FOUND || code == appConstants.CODE.UNAUTHORIZED
        || code == appConstants.CODE.BAD_REQUEST) {
        return code;
    } else {
        return appConstants.CODE.SERVER_ERROR;
    }
};

const getStatusTrueFalse = (code) => {
    return code == appConstants.CODE.SUCCESS;
};

const consoleLog = (message, data) => {
    console.log(message, ' ==> ', data);
}

const getReqParams = (req) => {
    return checkObjectNotEmpty(req.body) ? req.body : checkObjectNotEmpty(req.params) ? req.params : req.query;
}

const checkObjectNotEmpty = (obj) => {
    return Object.entries(obj).length > 0;
}


const createNotification = async function (data) {
    try {
        return {
            status: true,
            code: 200,
            message: "notification is created successfully",
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            code: e.code,
            message: e.message,
        }
    }
};

/*const singleNotification = function (obj) {
    return new Promise(resolve => {
        // return resolve(true);
        const message = {
            to: obj.token,
            notification: {
                title: obj.title,
                body: obj.message
            },
            data: obj.data || {},
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
                resolve(false);
            } else {
                console.log("Successfully sent with response: ", response);
                resolve(true);
            }
        })
    })
};

const multicastNotification = function (obj) {
    return new Promise(resolve => {
        // return resolve(true);
        const message = {
            registration_ids: obj.registration_ids,
            notification: {
                title: obj.title || "",
                body: obj.message || ""
            },
            data: obj.data || {}
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
                resolve(false);
            } else {
                console.log("Successfully sent with response: ", response);
                resolve(true);
            }
        })
    });
};

const createAndSendNotification = async function (notification) {
    try {
        await this.createNotification(notification)
        if (notification && !notification.token && notification.userId) {
            let userData = await User.findOne({id: notification.userId})
            if (userData && userData.fcmToken) {
                notification.token = userData.fcmToken
                return this.singleNotification(notification)
            } else
                console.log('FireBase Error', 'No fire base token found against this user')
        } else if (notification && notification.token) {
            return this.singleNotification(notification)
        }
    } catch (e) {
        console.log(e)
        return false
    }

}*/

const getListOfSpecificField = function (data, fieldName, condObj) {
    if (!condObj) {
        var listArray = data.reduce((list, obj) => {
            if (obj[fieldName]) {
                list.push(obj[fieldName])
                return list
            } else {
                return list
            }
        }, [])
    } else {
        var listArray = data.reduce((list, obj) => {
            if (obj[fieldName] && obj[condObj.field] === condObj.condition) {
                list.push(obj[fieldName])
                return list
            }
        }, [])
    }
    return [...new Set(listArray)]
}

const getWeekOfMonth = () => {
    var day = new Date().getDate()
    var date = new Date()
    day -= (date.getDay() == 0 ? 6 : date.getDay() - 1);//get monday of this week
    //special case handling for 0 (sunday)
    day += 7;
    //for the first non full week the value was negative
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(Math.abs(prefixes[0 | (day) / 7])) - 1);
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

const getDistanceFromLatLonInM = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000;
}

const miliSecondsToMins = (ms) => {
    let diff = Math.floor(ms / 1000);
    diff = Math.floor(diff / 60);
    return diff % 60;
}

const miliSecondsToDays = (ms) => {
    const diff = new moment.duration(ms);
    return Math.ceil(diff.asDays());
}

const getDayFromTimeStamp = (timestamp) => {
    if(typeof timestamp == "string")
        timestamp = JSON.parse(timestamp);
    return appConstants.DAYS_LIST[new Date(timestamp).getDay()];
}

const getWeekNumberFromDate = (timestamp, otherDate = new Date().getTime(), calculatingOnDay = 7) => {
    if(typeof timestamp == "string")
        timestamp = JSON.parse(timestamp);
    const differenceInMs = otherDate - timestamp;
    if(differenceInMs < 0) return 1;
    const days = miliSecondsToDays(differenceInMs);
    return days < calculatingOnDay ? 1: Math.ceil(days / calculatingOnDay);
}

const sortDataLogsByDate = (dataLogs) => {
    const newDataLogs = [];
    dataLogs.map((log) => {
        const date = moment(log.date).format('DD/MM/YYYY');
        const newLog = {
            date: date,
            dateValue: moment(log.date).valueOf(),
            logs: [log]
        }
        const find = newDataLogs.findIndex((obj) => obj.date == date);
        if (find == -1)
            newDataLogs.push(newLog);
        else
            newDataLogs[find].logs.push(newLog.logs[0]);
    });
    return newDataLogs;
}


const sortDataLogsByWeek = (dataLogs, weeks) => {
    const newDataLogs = [];
    for(let i=0; i<weeks.length; i++){
        const weekStart = moment(weeks[i]).startOf('day').valueOf();
        const weekEnd = moment(weeks[i]).startOf('day').add(7, 'days').valueOf();
        dataLogs?.map((log) => {
            if((
                (i+1 < weeks.length) && log.date >= weekStart && log.date < weeks[i+1]) ||
                (i+1 >= weeks.length && log.date >= weekStart && log.date <= weekEnd)
            ) {
                const date = moment(weeks[i]).format('MM/DD/YYYY');
                const newLog = {
                    date: date,
                    dateValue: moment(weeks[i]).valueOf(),
                    logs: [{...log, logDate: moment(log.date).format('MM/DD/YYYY')}]
                }
                const find = newDataLogs.findIndex((obj) => obj.date == date);
                if (find == -1) newDataLogs.push(newLog);
                else newDataLogs[find].logs.push(newLog.logs[0]);
            }
        });
    }
    return newDataLogs;
}

const filterLogsBySpecificDate = (dataLogs, startDate, endDate) => {
    if(dataLogs.length == 0) return [];
    const newDataLogs = [];
    dataLogs?.map((log) => {
        if((log.dateValue >= startDate && log.dateValue <= endDate)) {
            newDataLogs.push(log);
        }
    });
    return newDataLogs;
}

const getHoursMinsFromTimeString = (timeString) => {
    timeString = timeString.split(':');
    return ({
        hours: Number(timeString[0]),
        minutes: Number(timeString[1])
    })
}

const addMinutesInUnix = (timeStamp, mins) => {
    return moment(timeStamp).add(mins, 'minutes').valueOf();
}

const addMinutesInHourMinString = (timString, mins) => {
    const hoursMins = getHoursMinsFromTimeString(timString);
    hoursMins.minutes += mins;
    if(hoursMins.minutes >= 60) {
        hoursMins.hours += 1;
        hoursMins.minutes -= 60;
    }
    return hoursMins.hours + ':' + hoursMins.minutes.toString().padEnd(2, '0');
}

const convert24HoursStringTo12Hour = (timString) => {
    const hoursMins = getHoursMinsFromTimeString(timString);
    let amPm = ' AM';
    if(hoursMins.hours >= 12) {
        if(hoursMins.hours > 12) {
            hoursMins.hours -= 12;
        }
        amPm = ' PM';
    }
    return hoursMins.hours + ':' + hoursMins.minutes.toString().padEnd(2, '0') + amPm;
}

module.exports = {
    sendResponse: sendResponse,
    getReqParams: getReqParams,
    consoleLog: consoleLog,
/*    compressImages: compressImages,
    compressVideo: compressVideo,
    mapUploadedForStudio: mapUploadedForStudio,
    mapMediaForShow: mapMediaForShow,
    mapProfileImage: mapProfileImage,*/
    createNotification: createNotification,
    /*singleNotification: singleNotification,
    multicastNotification: multicastNotification,
    createAndSendNotification: createAndSendNotification,*/
    getListOfSpecificField: getListOfSpecificField,
    getWeekOfMonth: getWeekOfMonth,
    getDistanceFromLatLonInM: getDistanceFromLatLonInM,
    miliSecondsToMins: miliSecondsToMins,
    miliSecondsToDays: miliSecondsToDays,
    getDayFromTimeStamp: getDayFromTimeStamp,
    getWeekNumberFromDate: getWeekNumberFromDate,
    sortDataLogsByDate: sortDataLogsByDate,
    sortDataLogsByWeek: sortDataLogsByWeek,
    filterLogsBySpecificDate: filterLogsBySpecificDate,
    getHoursMinsFromTimeString: getHoursMinsFromTimeString,
    addMinutesInUnix: addMinutesInUnix,
    addMinutesInHourMinString: addMinutesInHourMinString,
    convert24HoursStringTo12Hour: convert24HoursStringTo12Hour,
}
