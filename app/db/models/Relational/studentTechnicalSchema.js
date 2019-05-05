const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "students_Technical_info",
    {
        College_ID: {
            type: Sequalize.STRING(100).BINARY,
            primaryKey: true,
            allowNull: false
        },
        RegistrationID: {
            type: Sequalize.STRING(50).BINARY,
            primaryKey: true,
            allowNull: false
        },
        StudentName: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        CompanyName: {
            type: Sequalize.STRING(100).BINARY
        },
        CompanyAddress: {
            type: Sequalize.TEXT
        },
        Designation: {
            type: Sequalize.STRING(50).BINARY
        }, Skills: {
            type: Sequalize.TEXT
        }
    },
    {
        tableName: "students_Technical_info",
        timestamps: true,
        underscored: false
    }
);