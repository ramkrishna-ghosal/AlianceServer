const AdminControllers = {},
    _ = require('lodash'),
    moment = require('moment'),
    tz = require('moment-timezone'),
    Models = require('../../../db/models/Relational/index'),
    commonFunction = require('../../../core/commonFunctions'),
    auth = require('../../../routes/middlewares/auth'),
    Op = require('sequelize').Op;





AdminControllers.AddAdmin = async (req, res, next) => {

    if (_.isNil(req.body.CollegeName)) {
        return res.send({
            responseCode: 404,
            responseText: 'College Name is required'
        })
    }

    if (_.isNil(req.body.CollegeState)) {
        return res.send({
            responseCode: 404,
            responseText: 'College state is required'
        })
    }

    if (_.isNil(req.body.mail)) {
        return res.send({
            responseCode: 404,
            responseText: 'Admin Email is required'
        })
    }

    if (_.isNil(req.body.password)) {
        return res.send({
            responseCode: 404,
            responseText: 'Admin Password is required'
        })
    }

    if (_.isNil(req.body.name)) {
        return res.send({
            responseCode: 404,
            responseText: 'Admin Name is required'
        })
    }

    if (_.isNil(req.body.mobile)) {
        return res.send({
            responseCode: 404,
            responseText: 'Mobile no is required'
        })
    }

    req.body.ProfilePicture = _.isNil(req.body.ProfilePicture) ? '' : req.body.ProfilePicture

    let College_ID = await commonFunction.createCollegeID(req.body.CollegeName, req.body.CollegeState)

    try {
        let password = await commonFunction.createHashPassword(req.body.password);

        let findResult = await Models.AdminSchema.findOne(
            {
                where: {
                    [Op.and]: [
                        {
                            username: req.body.name
                        }, {
                            [Op.or]: [{
                                AdminEmail: req.body.mail
                            }, {
                                AdminMobNo: req.body.mobile
                            }]
                        }
                    ]
                }
            }
        )

        if (!_.isEmpty(findResult)) {
            return res.send({
                responseCode: 402,
                responseText: 'Admin Already exists'
            })
        }

        // let OtpFind = await Models.otpSchema.findOne({
        //     where: {
        //         Mobile: req.body.mobile,
        //         OTP: req.body.captcha
        //     }
        // })

        // let currentTime = moment()
        // if (currentTime.diff(OtpFind.createdAt, 'minutes') >= 5) {
        //     return res.send({
        //         responseCode: 402,
        //         responseText: 'OTP has expired,please do the process again'
        //     })
        // }

        let result = await Models.AdminSchema.create({
            College_ID: College_ID,
            College_Name: req.body.CollegeName,
            College_state: req.body.CollegeState,
            AdminEmail: req.body.mail,
            AdminMobNo: req.body.mobile,
            adminPassword: password,
            username: req.body.name,
            ProfilePicture: req.body.ProfilePicture
        })
        return res.send({
            responseCode: 200,
            responseText: 'Add Admin successfully'
        })
    } catch (e) {
        console.log('e', e)
        return res.send({
            responseCode: 500,
            responseText: 'Internal error occured'
        })
    }

}

AdminControllers.AdminLogin = async (req, res, next) => {
    if (_.isNil(req.body.College_Name)) {
        return res.send({
            responseCode: 404,
            responseText: 'College Name is required'
        })
    }

    if (_.isNil(req.body.College_state)) {
        return res.send({
            responseCode: 404,
            responseText: 'College State is required'
        })
    }

    if (_.isNil(req.body.AdminName)) {
        return res.send({
            responseCode: 404,
            responseText: 'Admin Name is required'
        })
    }

    if (_.isNil(req.body.adminPassword)) {
        return res.send({
            responseCode: 404,
            responseText: 'Admin Password is required'
        })
    }

    let College_ID = await commonFunction.createCollegeID(req.body.College_Name, req.body.College_state)
    try {
        let Admin = await Models.AdminSchema.findOne({
            where: {
                College_ID: College_ID,
                AdminName: req.body.AdminName
            },
            raw: true
        })

        if (_.isEmpty(Admin)) {
            return res.send({
                responseCode: 402,
                responseText: 'Admin is not exist'
            })
        }


        let isChecked = await commonFunction.checkPassword(req.body.adminPassword, Admin.adminPassword);

        console.log('isChecked', isChecked)

        if (isChecked) {
            let dataToEncrypt = { ...{ College_ID: Admin.College_ID, AdminName: Admin.AdminName } }
            Admin = _.omit(Admin, ['adminPassword', 'AdminEmail', 'College_ID', 'createdAt', 'updatedAt', 'College_Name', 'College_state', 'ProfilePicture']);
            Admin.token = await auth.createAuthToken(dataToEncrypt);
            return res.send({
                responseCode: 200,
                responseData: Admin,
                responseText: 'Admin successfully logged in'
            })
        } else {
            return res.send({
                responseCode: 402,
                responseText: 'Password is wrong'
            })
        }
    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: 'Internal error occured'
        })
    }
}

AdminControllers.AddStudent = async (req, res, next) => {

    if (_.isNil(req.body.College_Name)) {
        return res.send({
            responseCode: 404,
            responseText: 'College name is required'
        })
    }

    if (_.isNil(req.body.College_state)) {
        return res.send({
            responseCode: 404,
            responseText: 'College state is required'
        })
    }

    if (_.isNil(req.body.RegistrationID)) {
        return res.send({
            responseCode: 404,
            responseText: 'Registration ID is required'
        })
    }

    if (_.isNil(req.body.StudentAddress)) {
        return res.send({
            responseCode: 404,
            responseText: 'Student Address is required'
        })
    }

    if (_.isNil(req.body.StudentEmail)) {
        return res.send({
            responseCode: 404,
            responseText: 'Student Email is required'
        })
    }

    if (_.isNil(req.body.StudentGender)) {
        return res.send({
            responseCode: 404,
            responseText: 'Student gender is required'
        })
    }

    if (_.isNil(req.body.StudentName)) {
        return res.send({
            responseCode: 404,
            responseText: 'Student Name is required'
        })
    }

    if (_.isNil(req.body.dob)) {
        return res.send({
            responseCode: 404,
            responseText: 'Date of birth is required'
        })
    }

    if (_.isNil(req.body.phoneno)) {
        return res.send({
            responseCode: 404,
            responseText: 'Phone no is required'
        })
    }


    let College_ID = await commonFunction.createCollegeID(req.body.College_Name, req.body.College_state);
    try {

        let fetchStudent = await Models.StudentSchema.findOne({
            where: {
                College_ID: College_ID,
                RegistrationID: req.body.RegistrationID
            }
        })

        if (!_.isEmpty(fetchStudent)) {
            return res.send({
                responseCode: 402,
                responseText: 'Student data is already exists'
            })
        }

        let studentPassword = Math.random().toString(36).slice(-8);

        console.log('StudentPassword', studentPassword)

        let hashPassword = await commonFunction.createHashPassword(studentPassword);

        let student = await Models.StudentSchema.create({
            College_ID: College_ID,
            College_Name: req.body.College_Name,
            College_state: req.body.College_state,
            RegistrationID: req.body.RegistrationID,
            StudentAddress: req.body.StudentAddress,
            StudentEmail: req.body.StudentEmail,
            StudentGender: req.body.StudentGender,
            StudentName: req.body.StudentEmail,
            dob: moment(req.body.dob, "DD-MM-YYYY"),
            phoneno: req.body.phoneno,
            StudentPassword: hashPassword
        })

        if (!_.isEmpty(student)) {
            let message = `Your registration is successfully done, your password to the portal is ${studentPassword}, please dont share this to anyone`;
            let result = await commonFunction.sendMobileOtp(req.body.phoneno, message);

            if (result) {
                return res.send({
                    responseCode: 200,
                    responseText: 'Student inserted successfully'
                })
            } else {
                return res.send({
                    responseCode: 402,
                    responseText: 'Internal error occured'
                })
            }
        }

    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: 'Internal error occured'
        })
    }
}

AdminControllers.AdminSendOtp = async (req, res, next) => {
    if (_.isNil(req.body.MobileNo)) {
        return res.send({
            responseCode: 404,
            responseText: 'Mobile No is required'
        })
    }

    try {

        let Admin = await Models.AdminSchema.findOne({ where: { AdminMobNo: req.body.MobileNo } })

        if (_.isEmpty(Admin)) {
            return res.send({
                responseCode: 402,
                responseText: 'Admin hasnt registered yet'
            })
        }

        let OTP = Math.random().toString(36).slice(-4);
        let message = `Your requested OTP is ${OTP}, this OTP is valid for next 5 mins`

        let result = await commonFunction.sendMobileOtp(req.body.MobileNo, message)

        if (!result) {
            return res.send({
                responseCode: 500,
                responseText: 'Internal error occured while sending OTP'
            })
        }

        let OTPResult = await Models.otpSchema.create({
            Mobile: req.body.MobileNo,
            OTP: OTP,
            type: 'Admin'
        })

        if (!_.isNil(OTPResult)) {
            return res.send({
                responseCode: 200,
                responseText: 'Otp is send to registered mobile'
            })
        } else {
            return res.send({
                responseCode: 402,
                responseText: 'Internal process failed to update the OTP'
            })
        }
    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: 'Internal error occured'
        })
    }


}

AdminControllers.AdminMobileLogin = async (req, res, next) => {
    if (_.isNil(req.body.MobileNo)) {
        return res.send({
            responseCode: 404,
            responseText: 'Mobile no is required'
        })
    }

    if (_.isNil(req.body.OTP)) {
        return res.send({
            responseCode: 404,
            responseText: 'OTP is required'
        })
    }

    let currentTime = moment()
    try {
        let FindOTp = Models.otpSchema.findOne({
            where: {
                Mobile: req.body.MobileNo,
                OTP: req.body.OTP
            }
        })

        if (_.isEmpty(FindOTp)) {
            return res.send({
                responseCode: 402,
                responseText: 'OTP is not present'
            })
        } else {
            let minsDiff = currentTime.diff(FindOTp.createdAt, 'minutes')
            if (minsDiff >= 5) {
                let isDeleted = await Models.otpSchema.destroy({
                    where: {
                        Mobile: req.body.MobileNo,
                        OTP: req.body.OTP
                    }
                })
                return res.send({
                    responseCode: 402,
                    responseText: 'OTP expired,please do the process again'
                })
            } else {
                let isDeleted = await Models.otpSchema.destroy({
                    where: {
                        Mobile: req.body.MobileNo,
                        OTP: req.body.OTP
                    }
                })
                return res.send({
                    responseCode: 200,
                    responseText: 'Admin logged in successfully'
                })
            }
        }
    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: 'Internal error occured'
        })
    }
}

module.exports = AdminControllers