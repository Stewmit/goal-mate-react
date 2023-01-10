const ApiError = require('../error/ApiError')
const Task = require("../models/task.model");

class TaskController {
    async createTask(req, res) {
        const {name} = req.body
        const task = await Task.create({name})
        return res.json(task)
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }

    async updateTask(req, res) {

    }

    async deleteTask(req, res) {

    }
}

module.exports = new TaskController()