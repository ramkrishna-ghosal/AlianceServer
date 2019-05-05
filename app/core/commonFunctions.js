const Models = require('../db/models/Relational/index'),
    constants = require('../config/constants'),
    bcrypt = require('bcrypt'),
    way2sms = require('way2sms'),
    _ = require('lodash'),
    express = require('express'),
    mkdirp = require('mkdirp'),
    saltRounds = 10;




const commonFunction = {}

commonFunction.createTable = async () => {
    /**
     * Model Sync
     */
    try {
        for (let model in Models) {
            await Models[model].sync({ force: false })
        }
    } catch (e) {
        console.error(`error:${e}`)
        return;
    }
}


commonFunction.createStaticFolder = (app) => {
    for (let folder in constants.uploads) {
        mkdirp(constants.uploads[folder], (err) => {
            if (!err) {
                app.use(express.static(folder));
            }
        })
    }
}

commonFunction.createCollegeID = (collegeName, collegeState) => {
    return new Promise((resolve, reject) => {
        collegeName = collegeName.split(' ');
        let Combination = ''
        for (let string of collegeName) {
            Combination += string.charAt(0).toUpperCase();
        }
        let uniqueID = collegeState.replace(/ /g, '').toUpperCase() + '_' + Combination
        resolve(uniqueID);
    })
}

commonFunction.createHashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject();
            } else {
                resolve(hash);
            }
        })
    })
}

commonFunction.checkPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject()
            } else {
                resolve(res)
            }
        })
    })
}

commonFunction.generateSMSAPIToken = async () => {

    try {
        let issuer = 'AlienceHoodServer-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        let findSMSCokkie = await Models.smsAPITokenSchema.findOne({ where: { issuer: issuer } });
        if (_.isEmpty(findSMSCokkie) || _.isNil(findSMSCokkie)) {
            let cokkie = await way2sms.login(process.env.mobileNo, process.env.mobilepassword);
            let createCokkie = Models.smsAPITokenSchema.create({
                issuer: issuer,
                cokkie: cokkie
            })
            console.log('Way2SMS API Key generated')
        }
    } catch (e) {
        console.log('exception', e);
        process.exit(0)
    }

}

commonFunction.sendMobileOtp = async (phoneno, message) => {
    let issuer = 'AlienceHoodServer-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
    try {
        let token = await Models.smsAPITokenSchema.findOne({
            where: {
                issuer: issuer
            }
        })

        if (_.isEmpty(token)) {
            console.log('token', token)
            return false
        }

        let isSend = await way2sms.send(token.cokkie, phoneno, message);
        return true

    } catch (e) {
        console.log('e', e);
        return false
    }
}

commonFunction.generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}




module.exports = commonFunction