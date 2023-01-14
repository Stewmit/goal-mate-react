const ApiError = require('../error/ApiError')
const Task = require("../models/task.model")

class TaskController {
    async createTask(req, res) {
        const {name, date} = req.body
        const task = await Task.create({name, date, userId: req.user.id})
        return res.json(task)
    }

    async getAll(req, res) {
        const tasks = await Task.findAll({ where: { userId: req.user.id } })
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
}

module.exports = new TaskController()