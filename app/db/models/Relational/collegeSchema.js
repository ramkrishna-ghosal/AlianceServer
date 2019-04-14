const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "colleges",
    {
        College_ID: {
            type: Sequalize.STRING(100).BINARY,
            primaryKey: true,
            allowNull: false
        },
        College_Name: {
            type: Sequalize.TEXT,
            allowNull: false
        },
        College_state: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        College_addr: {
            type: Sequalize.TEXT,
            allowNull: false
        },
    },
    {
        tableName: "colleges",
        timestamps: true,
        underscored: false
    }
);