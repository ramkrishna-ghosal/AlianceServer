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
        SemesterResultFolder: process.cwd() + '/uploads/semester/marks',
        SemesterFeesFolder: process.cwd() + '/uploads/semester/fees',
        AdminProfileFolder: process.cwd() + '/uploads/profile/admins',
        StudentProfileFolder: process.cwd() + '/uploads/profile/students'
    },
    encryption: {
        key: process.env.encryptionKey,
    }

}