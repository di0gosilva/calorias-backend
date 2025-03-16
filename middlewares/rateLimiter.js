const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Muitas requisições desde IP, tente novamente mais tarde." //Limite de 100 requisições por IP dentro dessa janela
})

module.exports = limiter