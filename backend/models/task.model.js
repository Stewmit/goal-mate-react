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
        type: DataTypes.STRING,
        allowNull: false
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    time: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    highlightColor: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
})

module.exports = Task