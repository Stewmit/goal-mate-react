const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const HabitDay = sequelize.define('habit_day', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE
    },
    isComplete: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = { HabitDay }