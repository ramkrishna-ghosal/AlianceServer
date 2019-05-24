const sequelize = require('../../index'),
    Sequalize = require('sequelize');

const AdminSchema = require('./adminSchema');
const StudentSchema = require('./studentSchema');
const smsAPITokenSchema = require('./smsAPITokenSchema')
const collegeSchema = require('./collegeSchema')
const facebookSocialSchema = require('./facebookSocialSchema')
const otpSchema = require('./otpSchema')
const StudentTechnicalSchema = require('./studentTechnicalSchema');
const AdminsInfoSchema=require('./adminInfoSchema');

StudentSchema.hasOne(StudentTechnicalSchema, { foreignKey: 'College_ID', sourceKey: 'College_ID' })
AdminSchema.belongsTo(AdminsInfoSchema,{foreignKey:'username',targetKey:'username'})
AdminSchema.hasMany(StudentSchema,{ foreignKey: 'College_ID', sourceKey: 'College_ID' })
module.exports = {
    AdminsInfoSchema:AdminsInfoSchema,
    StudentTechnicalSchema: StudentTechnicalSchema,
    AdminSchema: AdminSchema,
    StudentSchema: StudentSchema,
    smsAPITokenSchema: smsAPITokenSchema,
    collegeSchema: collegeSchema,
    facebookSocialSchema: facebookSocialSchema,
    otpSchema: otpSchema,
    
   
}
