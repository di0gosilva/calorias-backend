const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SECRET = process.env.JWT_SECRET || "default_secret"

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET, { expiresIn: "7d" })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

const comparePassword = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = { generateToken, hashPassword, comparePassword }