const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Habit = sequelize.define('habit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    regularity: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    endDate: {
        type: DataTypes.DATEONLY
    },
    target: {
        type: DataTypes.INTEGER
    },
    unit: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
})

module.exports = Habit