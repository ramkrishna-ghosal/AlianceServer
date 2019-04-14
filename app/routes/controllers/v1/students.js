const router = require('express').Router(),
    UserControllers = require('../../../services/v1/students/StudentsControllers'),
    middlewares = require('../../middlewares/auth');




/**
 * Routes Configuration starts from here
 */

router.post('/student-login', UserControllers.StudentLogin);
router.post('/forgotPassword', UserControllers.forgotPassword)
router.post('/fetch-student-data', middlewares.verifyStudentToken, UserControllers.fetchStudentData)

module.exports = router