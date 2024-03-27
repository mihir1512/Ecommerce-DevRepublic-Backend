const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')
exports.verifyToken = async (req, res, next) => {
    try {

        const token = req.headers?.authorization ? req.headers?.authorization.split(' ')[1] : ''

        if (!token) {
            return res.status(400).json({
                message: 'token missing'
            })
        }

        const verifyToken = await jwt.verify(token, jwtSecret)

        req.body.user_id = verifyToken.userId

        next()

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}