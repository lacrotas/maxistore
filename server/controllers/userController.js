const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const ApiError = require("../error/ApiError");

const generateJwt = (id, login) => {
    return jwt.sign(
        { id, login },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }
        if (password != user.password) {
            return next(ApiError.badRequest('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, login);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login)
        return res.json({ token })
    }
}

module.exports = new UserController();