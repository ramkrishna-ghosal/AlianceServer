const Models = require('../db/models/Relational/index'),
    bcrypt = require('bcrypt'),
    way2sms = require('way2sms'),
    _ = require('lodash'),
    saltRounds = 10;




const commonFunction = {}

commonFunction.createTable = async () => {
    /**
     * Model Sync
     */
    try {
        await Models.AdminSchema.sync({ force: false });
        await Models.StudentSchema.sync({ force: false });
        await Models.smsAPITokenSchema.sync({ force: false });
        await Models.collegeSchema.sync({ force: false });
        await Models.facebookSocialSchema.sync({ force: false });
        await Models.otpSchema.sync({ force: false })
    } catch (e) {
        console.error(`error:${e}`)
        return;
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
        let cokkie = await way2sms.reLogin(process.env.mobileNo, process.env.mobilepassword);
        let issuer = 'AlienceHoodServer-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        let findSMSCokkie = await Models.smsAPITokenSchema.findOne({ where: { issuer: issuer } });

        if (_.isEmpty(findSMSCokkie) || _.isNil(findSMSCokkie)) {
            let createCokkie = Models.smsAPITokenSchema.create({
                issuer: issuer,
                cokkie: cokkie
            })
            console.log('SMS API Token generated');
        } else {
            let updateCokkie = Models.smsAPITokenSchema.update({
                cokkie: cokkie
            }, {
                    where: {
                        issuer: issuer
                    }
                })
            console.log('SMS API Token Updated');
        }
    } catch (e) {
        console.log('Exception', e)
        process.exit(0);
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




module.exports = commonFunction