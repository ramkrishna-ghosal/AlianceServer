const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "students",
    {
        College_ID: {
            type: Sequalize.STRING(100).BINARY,
            primaryKey: true,
            allowNull: false
        },
        College_Name: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        College_state: {
            type: Sequalize.STRING(50).BINARY,
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
        StudentEmail: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        phoneno: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        StudentGender: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        StudentAddress: {
            type: Sequalize.TEXT,
            allowNull: false
        },
        dob: {
            type: Sequalize.DATE,
            allowNull: false
        },
        profilePic: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: true
        },
        StudentPassword: {
            type: Sequalize.STRING(500).BINARY,
            allowNull: true
        }
    },
    {
        tableName: "students",
        timestamps: true,
        underscored: false
    }
);