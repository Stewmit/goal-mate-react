const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    listOrder: {
        type: DataTypes.INTEGER
    },
    dayOrder: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    isComplete: {
        type: DataTypes.BOOLEAN
    },
    time: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    highlightColor: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
})

module.exports = { Task }