const User = require('./user.model')
const Task = require('./task.model')
const Subtask = require('./subtask.model')
const Goal = require('./goal.model')
const Habit = require('./habit.model')
const HabitDay = require('./habit_day.model')

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const FriendRequest = sequelize.define('friend_request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    friendId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING
    }
})

User.hasMany(Habit)
Habit.belongsTo(User)

User.hasMany(Task)
Task.belongsTo(User)

User.hasMany(Goal)
Goal.belongsTo(User)

Task.hasMany(Subtask, {onDelete: 'CASCADE'})
Subtask.belongsTo(Task)

Goal.hasMany(Task)
Task.belongsTo(Goal)

Goal.hasMany(Habit)
Habit.belongsTo(Goal)

Habit.hasMany(HabitDay)
HabitDay.belongsTo(Habit)

User.belongsToMany(User, {through: FriendRequest, as: 'Friends', foreignKey: 'userId'})
User.belongsToMany(User, {through: FriendRequest, as: 'UserFriends', foreignKey: 'friendId'})

module.exports = FriendRequest