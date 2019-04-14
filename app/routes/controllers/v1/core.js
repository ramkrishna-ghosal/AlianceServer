const router = require('express').Router(),
    MainControllers = require('../../../services/v1/core/mainControllers');



router.route('/fetch-college-data').get(MainControllers.fetchCollegeData);
router.route('/add-college-data').post(MainControllers.addCollegeData);


module.exports = router
