const ApiError = require('../error/ApiError')
const Goal = require('../models/goal.model')
const uuid = require('uuid')
const path = require('path')
const Task = require('../models/task.model')
const Habit = require('../models/habit.model')

class GoalController {
    async createGoal(req, res, next) {
        try {
            const {name, category, dueDate, description, taskList, habitList} = req.body
            
            const {img} = req.files
            let fileName
            
            if (img) {
                const fileName = uuid.v4() + '.jpg'
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            
            const newGoal = await Goal.create({
                name,
                category,
                dueDate,
                description,
                image: fileName,
                userId: req.user.id
            })

            // Пройтись по таск листу и добавить id цели
            // Пройтись по привычкам и добавить id цели

            return res.json(newGoal)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const goals = await Goal.findAll({
            where: {
                userId: req.user.id
            }
        })

        return res.json(goals)
    }

    async getOne(req, res) {

    }

    async updateGoal(req, res) {

    }

    async deleteGoal(req, res) {

    }
}

module.exports = new GoalController()