const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "admins_info",
    {
        College_ID: {
            type: Sequalize.STRING(100).BINARY,
            allowNull: false
        },
        username: {
            type: Sequalize.STRING(50).BINARY,
            primaryKey: true,
            allowNull: false
        },
        Admin_address:{
            type:Sequalize.TEXT,
            allowNull:false,
        },
        Admin_designation:{
            type:Sequalize.STRING(50).BINARY,
            allowNull:false
        }
    },
    {
        tableName: "admins-info",
        timestamps: true,
        underscored: false
    }
);