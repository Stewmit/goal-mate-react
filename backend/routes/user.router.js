const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const friendController = require('../controllers/friend.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', authMiddleware, userController.getAll)
router.put('/', authMiddleware, userController.updateUser)
router.put('/password', authMiddleware, userController.changePassword)
router.put('/avatar', authMiddleware, userController.changeAvatar)
router.delete('/', authMiddleware, userController.deleteUser)
router.get('/friend', authMiddleware, friendController.getFriends)
router.post('/friend', authMiddleware, friendController.addFriend)
router.delete('/friend', authMiddleware, friendController.deleteFriend)

module.exports = router