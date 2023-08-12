const FriendRequest = require("../models")
const ApiError = require("../error/ApiError")
const User = require("../models/user.model")

class FriendController {

    async getFriends(req, res, next) {
        const {status} = req.query

        try {
            const users1 = await FriendRequest.findAll({
                where: {
                    userId: req.user.id,
                    status
                }
            })
            const users2 = await FriendRequest.findAll({
                where: {
                    friendId: req.user.id,
                    status
                }
            })
            const friends1 = await users1.map(u => u.friendId)
            const friends2 = await users2.map(u => u.userId)
            const all = [...friends1, ...friends2]
            const allFriends = await User.findAll({
                where: {
                    id: all
                }
            })
            return res.json(allFriends)
        }
        catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async addFriend(req, res, next) {

        const {friendId} = req.body

        try {
            await FriendRequest.create({
                userId: req.user.id,
                friendId,
                status: 'default'
            })
            return res.json({message: 'Friend was added!'})
        }
        catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async changeStatus(req, res, next) {

        // const {friendId, newStatus} = req.body
        //
        // try {
        //     await FriendRequest.update(
        //         {
        //             status: newStatus
        //         },
        //         {
        //             where: {
        //                 userId: req.user.id,
        //                 friendId
        //             }
        //         })
        //     return res.json({message: 'Friend was added!'})
        // }
        // catch (error) {
        //     return next(ApiError.badRequest(error.message))
        // }
    }

    async deleteFriend(req, res) {

        const {id} = req.body

        await User.destroy({
            where: {
                id
            },
        })

        return res.json({message: 'User was deleted!'})
    }
}

module.exports = new FriendController()