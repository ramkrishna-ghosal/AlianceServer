require('dotenv').config()

module.exports = {
    allowMimeType: ['image/jpeg', 'image/png', 'application/pdf'],
    jwt: {
        secret: process.env.jwtSecret,
        options: {
            algorithm: 'HS512',
            expiresIn: 60 * 60,
            audience: 'aud:AlienceHoodServer',
            issuer: 'AlienceHoodServer-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        }
    },
    uploads: {
        TempSemesterResultFolder: global.appPath + '/uploads/TempSemsterResult',
        TempSemesterFeesFolder: global.appPath + '/uploads/TempSemesterFeesFolder',
        TempAdminProfileFolder: global.appPath + '/uploads/TempAdminProfileFolder'
    },
    encryption: {
        key: process.env.encryptionKey,
    }

}