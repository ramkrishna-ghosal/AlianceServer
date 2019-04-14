const UserControllers = {},
    _ = require('lodash'),
    moment = require('moment'),
    commonFunction = require('../../../core/commonFunctions'),
    auth = require('../../../routes/middlewares/auth'),
    Models = require('../../../db/models/Relational/index');




UserControllers.StudentLogin = async (req, res, next) => {

    if (_.isNil(req.body.collegeName)) {
        return res.send({
            responseCode: 404,
            responseText: 'College Name is required'
        })
    }

    if (_.isNil(req.body.stateName)) {
        return res.send({
            responseCode: 404,
            responseText: 'College State is required'
        })
    }

    if (_.isNil(req.body.registrationID)) {
        return res.send({
            responseCode: 404,
            responseText: 'Student registration ID is required'
        })
    }

    if (_.isNil(req.body.password)) {
        return res.send({
            responseCode: 404,
            responseText: 'Student Password is required'
        })
    }

    let CollegeID = await commonFunction.createCollegeID(req.body.collegeName, req.body.stateName);

    try {
        let Student = await Models.StudentSchema.findOne({
            where: {
                College_ID: CollegeID,
                RegistrationID: req.body.registrationID
            },
            // attributes: ['College_ID', 'RegistrationID', 'StudentPassword'],
            raw: true
        })

        if (_.isEmpty(Student)) {
            return res.send({
                responseCode: 402,
                responseText: 'Students is not exists'
            })
        }

        let isChecked = await commonFunction.checkPassword(req.body.password, Student.StudentPassword)

        if (isChecked) {
            let token = await auth.createAuthToken({ ...{ CollgeID: Student.College_ID, RegistrationID: Student.RegistrationID } });

            Student = _.omit(Student, ['StudentPassword', 'College_ID', 'RegistrationID']);
            Student.authToken = token;
            return res.send({
                responseCode: 200,
                responseData: Student,
                responseText: 'Student Logged in successfully'
            })
        } else {
            return res.send({
                responseCode: 402,
                responseText: 'Password mismatched'
            })
        }

    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: 'Internal error occured'
        })
    }
}


UserControllers.forgotPassword = async (req, res, next) => {

    if (_.isNil(req.body.RegistrationID)) {
        return res.send({
            responseCode: 404,
            responseText: 'Registration ID is required'
        })
    }

    if (_.isNil(req.body.collegeName)) {
        return res.send({
            responseCode: 404,
            responseText: 'College Name is required'
        })
    }

    if (_.isNil(req.body.collegeState)) {
        return res.send({
            responseCode: 404,
            responseText: 'College state is required'
        })
    }

    let password = await commonFunction.createHashPassword(req.body.password);
    let College_ID = await commonFunction.createCollegeID(req.body.collegeName, req.body.collegeState)
    let result = await Models.StudentSchema.update({
        StudentPassword: password
    }, {
            where: {
                RegistrationID: req.body.RegistrationID,
                College_ID: College_ID
            }
        })

    if (result) {
        return res.send({
            responseCode: 200,
            responseText: 'Successfully updated'
        })
    }
}

UserControllers.fetchStudentData = async (req, res, next) => {
    if (_.isNil(req.userdetails)) {
        return res.send({
            responseCode: 402,
            responseText: 'Student is not present'
        })
    } else {
        return res.send({
            responseCode: 200,
            responseData: req.userdetails,
            responseText: 'Fetch Students data'
        })
    }
}

module.exports = UserControllers
