const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user.model')

const generateJWT = (id, name, surname, email) => {
    return jwt.sign(
        {
            id,
            name,
            surname,
            email
        }, 
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
}

class UserController {
    async registration(req, res, next) {
        
        const {name, surname, email, password} = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password!'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email address already exists!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, surname, email, password: hashPassword})
        
        const token = generateJWT(user.id, user.name, user.surname, user.email)
        return res.json({token})
    }

    async login(req, res, next) {

        const {email, password} = req.body

        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('No user found with this email!'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password!'))
        }

        const token = generateJWT(user.id, user.name, user.surname, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.name, req.user.surname, req.user.email)
        return res.json({token})
    }

    async updateUser(req, res) {
        const {id, name, surname, email} = req.body

        await User.update(
            {
                name,
                surname,
                email
            },
            {
                where: {
                    id
                },
            }
        )

        const user = await User.findOne({where: {id}})

        const token = generateJWT(user.id, user.name, user.surname, user.email)
        return res.json({token})
    }

    async changePassword(req, res, next) {
        const {id, oldPassword, newPassword} = req.body

        const user = await User.findOne({where: {id}})

        let comparePassword = bcrypt.compareSync(oldPassword, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password!'))
        }

        const hashPassword = await bcrypt.hash(newPassword, 5)

        await User.update(
            {
                password: hashPassword
            },
            {
                where: {
                    id
                },
            }
        )

        return res.json({message: 'Password was changed!'})
    }

    async deleteUser(req, res) {

        const {id} = req.body

        await User.destroy({
            where: {
                id
            },
        })

        return res.json({message: 'User was deleted!'})
    }
}

module.exports = new UserController()