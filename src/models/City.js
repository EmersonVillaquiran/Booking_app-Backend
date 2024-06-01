const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CountryId: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = City;