const Router = require('express')
const router = new Router()
const goalController = require('../controllers/goal.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, goalController.createGoal)
router.get('/', authMiddleware, goalController.getAll)
router.get('/:id', authMiddleware, goalController.getOne)
router.put('/', authMiddleware, goalController.updateGoal)
router.delete('/', authMiddleware, goalController.deleteGoal)

module.exports = router