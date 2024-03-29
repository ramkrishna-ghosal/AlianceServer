const Models = require('../../db/models/Relational/index'),
    commonFunction = require('../../core/commonFunctions'),
    constants = require('../../config/constants'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    AuthControllers = {};


AuthControllers.createAuthToken = (userdata) => {
    return new Promise((resolve, reject) => {
        jwt.sign(userdata, constants.jwt.secret, constants.jwt.options, (err, token) => {
            if (err) {
                reject();
            } else {
                resolve(token);
            }
        })
    })
}

AuthControllers.verifyStudentToken = (req, res, next) => {

    var token = req.headers['authToken'] || req.headers['access-token'] || req.headers.Authorization || req.body.accessToken
    if (!token) {
        return res.send({
            responseCode: 404,
            responseText: 'Token is required'
        })
    }

    jwt.verify(token, constants.jwt.secret, (error, decoded) => {
        if (error instanceof Error) {
            if (error.name == 'TokenExpiredError') {
                return res.send({
                    statusCode: 500,
                    message: 'Token expired'
                })
            } else {
                console.log('error', error)
                return res.send({
                    statusCode: 500,
                    message: 'Internal error occured'
                })
            }
        } else {
            Models.StudentSchema.findOne({
                where: {
                    College_ID: decoded.CollgeID,
                    RegistrationID: decoded.RegistrationID
                }
            })
                .then((user) => {

                    user = user.get({ plain: true })
                    if (_.isEmpty(user)) {
                        return res.send({
                            statusCode: 401,
                            message: 'Student is not present in this application'
                        })
                    } else {
                        req.userdetails = user
                        next()
                    }
                })
                .catch((error) => {
                    return res.send({
                        statusCode: 500,
                        message: 'Internal error occured'
                    })
                })
        }
    })
}


AuthControllers.verifyAdminToken = (req, res, next) => {
    var token = req.headers.authToken || req.headers['access-token'] || req.headers.Authorization || req.body.accessToken
    if (!token) {
        return res.send({
            responseCode: 404,
            responseText: 'Token is required'
        })
    }

    jwt.verify(token, constants.jwt.secret, (error, decoded) => {
        if (error instanceof Error) {
            if (error.name == 'TokenExpiredError') {
                return res.send({
                    statusCode: 500,
                    message: 'Token expired'
                })
            } else {
                return res.send({
                    statusCode: 500,
                    message: 'Internal error occured'
                })
            }
        } else {
            Models.AdminSchema.findOne({
                where: {
                    College_ID: decoded.College_ID,
                    RegistrationID: decoded.adminName
                }
            })
                .then((user) => {
                    user = user.get({ plain: true })
                    if (_.isEmpty(user)) {
                        return res.send({
                            statusCode: 401,
                            message: 'Admin is not present in this application'
                        })
                    } else {
                        req.userdetails = user
                        next()
                    }
                })
                .catch((error) => {
                    return res.send({
                        statusCode: 500,
                        message: 'Internal error occured'
                    })
                })
        }
    })
}

module.exports = AuthControllers





