const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "facebook-social",
    {
        FacebookID: {
            type: Sequalize.STRING(100).BINARY,
            primaryKey: false,
            allowNull: false
        },
        name: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        email: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        provider: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        token: {
            type: Sequalize.TEXT,
            allowNull: false
        },
        ProfilePicture: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        }
    },
    {
        tableName: "facebook-social",
        timestamps: true,
        underscored: false
    }
);