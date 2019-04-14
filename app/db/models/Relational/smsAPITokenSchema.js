const sequelize = require('../../index'),
    Sequalize = require('sequelize');


module.exports = sequelize.define(
    "smsapitoken",
    {
        issuer: {
            type: Sequalize.STRING(500).BINARY,
            allowNull: false
        },
        cokkie: {
            type: Sequalize.STRING(500).BINARY,
            allowNull: false
        }
    },
    {
        tableName: "smsapitoken",
        timestamps: false,
        underscored: false
    }
);