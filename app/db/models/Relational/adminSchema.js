const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "admins",
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
        AdminEmail: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        AdminMobNo: {
            type: Sequalize.STRING(12).BINARY,
            allowNull: false
        },
        username: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        adminPassword: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        ProfilePicture: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        }
    },
    {
        tableName: "admins",
        timestamps: true,
        underscored: false
    }
);