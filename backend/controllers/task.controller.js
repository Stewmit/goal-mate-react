const ApiError = require('../error/ApiError')
const Task = require("../models/task.model")
const Subtask = require("../models/subtask.model")
const {Op} = require("sequelize");

class TaskController {
    async createTask(req, res) {
        const {name, time, date, description, highlightColor, isComplete, subtasks} = req.body

        const newTask = await Task.create({
            name,
            time,
            date,
            description,
            highlightColor,
            isComplete,
            userId: req.user.id
        })

        if (subtasks) {
            for (let i = 0; i < subtasks.length; i++) {
                let tempSubtask = await Subtask.create({name: subtasks[i].name, order: i+1, isComplete: subtasks[i].isComplete, taskId: newTask.id})
                await newTask.addSubtask(tempSubtask)
            }
        }

        const task = await Task.findOne({
            where: { id: newTask.id },
            include: [{
                model: Subtask,
            }],
            order: [
                [Subtask, 'order', 'ASC']
            ]
        })

        return res.json(task)
    }

    async getAll(req, res) {

        const {sortingType, startDate, endDate} = req.query

        let conditions = {}

        if (startDate && endDate) {
            conditions = {
                [Op.and]: [
                    {
                        userId: req.user.id
                    },
                    {
                        date: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                ]
            }
        }
        else {
            conditions = {
                userId: req.user.id
            }
        }

        const tasks = await Task.findAll({
            where: conditions,
            include: [{
                model: Subtask,
            }],
            order: [
                [sortingType ? sortingType : 'date', 'ASC'],
                [Subtask, 'order', 'ASC']
            ]
        })

        return res.json(tasks)
    }

    async updateTask(req, res) {
        const data = req.body
        const id = data.id
        const subtasks = data.subtasks

        const taskToUpdate = await Task.findOne({where: { id }})
        taskToUpdate.update({...data})

        await Subtask.destroy({
            where: {
                taskId: id
            },
        })

        if (subtasks) {
            for (let i = 0; i < subtasks.length; i++) {
                let tempSubtask = await Subtask.create({name: subtasks[i].name, order: i+1, isComplete: subtasks[i].isComplete, taskId: taskToUpdate.id})
                await taskToUpdate.addSubtask(tempSubtask)
            }
        }

        return res.json({message: 'Task was updated!'})
    }

    async deleteTask(req, res) {
        const {id} = req.body

        await Task.destroy({
            where: {
                id
            },
        })

        return res.json({message: 'Task was deleted!'})
    }
}

module.exports = new TaskController()