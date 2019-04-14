const Router = require('express').Router(),
    FacebookControllers = require('../../../services/v1/socials/facebook'),
    GoogleControllers = require('../../../services/v1/socials/google');

require('dotenv').config();

// passport.use(new FacebookStrategy({
//     clientID: process.env.facebook_app_id,
//     clientSecret: process.env.facebook_app_secret,
//     callbackURL: process.env.facebook_callback
// },
//     function (accessToken, refreshToken, profile, done) {
//         process.nextTick(() => {
//             //'https://www.youtube.com/watch?v=OMcWgmkMpEE'
//             console.log('accessToken', accessToken)
//             console.log('refreshToken', refreshToken)
//             console.log('profile', profile)
//         })
//     }
// ));


Router.post('/facebook/auth',FacebookControllers.getAuth );
//Router.post('/facebook', );
//Router.post('/google/auth',);


module.exports = Router