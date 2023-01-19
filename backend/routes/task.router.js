const Router = require('express')
const router = new Router()
const taskController = require('../controllers/task.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, taskController.createTask)
router.get('/', authMiddleware, taskController.getAll)
router.put('/', authMiddleware, taskController.updateTask)
router.delete('/', authMiddleware, taskController.deleteTask)
router.post('/subtask', authMiddleware, taskController.createSubtask)
router.delete('/subtask', authMiddleware, taskController.deleteSubtask)
router.put('/subtask', authMiddleware, taskController.updateSubtask)

module.exports = router