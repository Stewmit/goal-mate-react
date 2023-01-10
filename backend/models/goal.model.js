const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Goal = sequelize.define('goal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    dueDate: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    }
})

module.exports = Goal