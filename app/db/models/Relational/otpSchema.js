const sequelize = require('../../index'),
    Sequalize = require('sequelize');

module.exports = sequelize.define(
    "MobileOtp",
    {
        Mobile: {
            type: Sequalize.STRING(12).BINARY,
            allowNull: false
        },
        OTP: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        type: {
            type: Sequalize.STRING(50).BINARY,
            allowNull: false
        },
        service: {
            type: Sequalize.ENUM('Register', 'Login','Forgot'),
            allowNull: false
        },
    },
    {
        tableName: "MobileOtp",
        timestamps: true,
        underscored: false
    }
);