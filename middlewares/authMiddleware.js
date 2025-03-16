const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || "default_secret"

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return res.status(401).json({message: "Token não fornecido."})
        }

        const parts = authHeader.split(' ')
        if(parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({message: "Token inválido."})
        }

        const token = parts[1]
    
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({ error: "Token inválido."})
            }

            req.userId = decoded.userId
            next()
        })
    } catch(error) {
        return res.status(401).json({message: "Erro interno no servidor." })
    }
}

module.exports = authMiddleware