const ApiError = require('../error/ApiError')
const Task = require("../models/task.model")
const Subtask = require("../models/subtask.model")

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
        // if (subtasks) {
        //     for (let i = 0; i < subtasks.length; i++) {
        //         let tempSubtask = await Subtask.create({name: subtasks[i].name, order: subtasks[i].order, isComplete: subtasks[i].isComplete})
        //         await newTask.addSubtask(tempSubtask)
        //     }
        // }

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

    async createSubtask(req, res) {
        const {name, isComplete, order, taskId} = req.body

        const newSubtask = await Subtask.create({
            name,
            isComplete,
            order,
            taskId
        })

        return res.json(newSubtask)
    }

    async getAll(req, res) {
        const tasks = await Task.findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: Subtask,
            }],
            order: [
                [Subtask, 'order', 'ASC']
            ]
        })
        return res.json(tasks)
    }

    async updateTask(req, res) {
        const data = req.body
        const id = data.id

        await Task.update({...data},
            {
                where: {
                    id
                },
            })

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

    async deleteSubtask(req, res) {
        const {id} = req.body

        await Subtask.destroy({
            where: {
                id
            },
        })

        return res.json({message: 'Subtask was deleted!'})
    }

    async updateSubtask(req, res) {
        const data = req.body
        const id = data.id

        await Subtask.update({...data},
            {
                where: {
                    id
                },
            })

        return res.json({message: 'Subtask was updated!'})
    }
}

module.exports = new TaskController()