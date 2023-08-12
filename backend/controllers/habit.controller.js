const ApiError = require('../error/ApiError')
const Habit = require("../models/habit.model")
const HabitDay = require("../models/habit_day.model")

class HabitController {
    async createHabit(req, res) {

        const {name, regularity, endDate, target, unit, description} = req.body

        const habit = await Habit.create({
            name,
            regularity,
            // endDate,
            // target,
            // unit,
            // description,
            userId: req.user.id
        })

        return res.json(habit)
    }

    async getAll(req, res) {
        const habits = await Habit.findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: HabitDay
            }]
        })

        return res.json(habits)
    }

    async getOne(req, res) {
        const {id} = req.params
        const habit = await Habit.findOne(
            {
                where: {
                    id,
                    userId: req.user.id
                },
                include: [{
                    model: HabitDay
                }]
            },
        )
        return res.json(habit)
    }

    async updateHabit(req, res) {

    }

    async deleteHabit(req, res) {
        const {id} = req.body

        await Habit.destroy({
            where: {
                id
            },
        })

        return res.json({message: 'Habit was deleted!'})
    }

    async addDay(req, res) {
        const {date, comment, habitId} = req.body
        const habitDay = await HabitDay.create({
            date,
            comment,
            habitId
        })

        return res.json(habitDay)
    }

    async deleteDay(req, res) {
        const {id} = req.body
        console.log(id)

        await HabitDay.destroy({
            where: {
                id
            },
        })

        return res.json({message: 'Day was deleted!'})
    }
}

module.exports = new HabitController()