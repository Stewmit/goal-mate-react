const Router = require('express')
const userRouter = require('./user.router')
const taskRouter = require('./task.router')
const habitRouter = require('./habit.router')
const goalRouter = require('./goal.router')

const router = new Router()

router.use('/user', userRouter)
router.use('/task', taskRouter)
router.use('/habit', habitRouter)
router.use('/goal', goalRouter)

module.exports = router