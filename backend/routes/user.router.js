const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.put('/', authMiddleware, userController.updateUser)
router.put('/password', authMiddleware, userController.changePassword)
router.delete('/', authMiddleware, userController.deleteUser)

module.exports = router