const authorizationMiddleware = (req, res, next) => {
    const { userId } = req.params
    const authUserId = req.user.userId
    if(parseInt(userId) !== authUserId) {
        return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para acessar esses dados.' })
    }
    next();
}

module.exports = authorizationMiddleware