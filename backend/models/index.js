const {User} = require('./user.model')
const {Task} = require('./task.model')
const {Subtask} = require('./subtask.model')
const {Goal} = require('./goal.model')
const {Habit} = require('./habit.model')
const {HabitDay} = require('./habit_day.model')

User.hasMany(Task)
Task.belongsTo(User)

User.hasMany(Goal)
Goal.belongsTo(User)

User.hasMany(Habit)
Habit.belongsTo(User)

Task.hasMany(Subtask)
Subtask.belongsTo(Task)

Goal.hasMany(Task)
Task.belongsTo(Goal)

Goal.hasMany(Habit)
Habit.belongsTo(Goal)

Habit.hasMany(HabitDay)
HabitDay.belongsTo(HabitDay)