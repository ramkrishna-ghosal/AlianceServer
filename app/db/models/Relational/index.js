const sequelize = require('../../index'),
    Sequalize = require('sequelize');

const AdminSchema = require('./adminSchema');
const StudentSchema = require('./studentSchema');
const smsAPITokenSchema = require('./smsAPITokenSchema')
const collegeSchema = require('./collegeSchema')
const facebookSocialSchema = require('./facebookSocialSchema')
const otpSchema = require('./otpSchema')

module.exports = {
    AdminSchema: AdminSchema,
    StudentSchema: StudentSchema,
    smsAPITokenSchema: smsAPITokenSchema,
    collegeSchema: collegeSchema,
    facebookSocialSchema: facebookSocialSchema,
    otpSchema: otpSchema
}
