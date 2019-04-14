const router = require('express').Router(),
    AdminController = require('../../../services/v1/admin/AdminControllers');

/**
 * Router Configuration starts from here
 */

router.route('/add-admin').post(AdminController.AddAdmin);
router.route('/login').post(AdminController.AdminLogin);
router.route('/send-otp').post(AdminController.AdminSendOtp)
router.route('/mobile-login').post(AdminController.AdminMobileLogin)
router.route('/add-student').post(AdminController.AddStudent);



module.exports = router