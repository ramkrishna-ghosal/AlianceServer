const sequelize = require('../../index'),
    Sequalize = require('sequelize');

const AdminSchema = require('./adminSchema');
const StudentSchema = require('./studentSchema');
const smsAPITokenSchema = require('./smsAPITokenSchema')
const collegeSchema = require('./collegeSchema')
const facebookSocialSchema = require('./facebookSocialSchema')
const otpSchema = require('./otpSchema')
const StudentTechnicalSchema = require('./studentTechnicalSchema');

StudentSchema.hasOne(StudentTechnicalSchema, { foreignKey: 'College_ID', sourceKey: 'College_ID' })

module.exports = {
    AdminSchema: AdminSchema,
    StudentSchema: StudentSchema,
    smsAPITokenSchema: smsAPITokenSchema,
    collegeSchema: collegeSchema,
    facebookSocialSchema: facebookSocialSchema,
    otpSchema: otpSchema,
    StudentTechnicalSchema: StudentTechnicalSchema
}
