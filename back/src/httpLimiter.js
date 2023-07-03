const rateLimit = require('express-rate-limit');

const limiterMiddleware = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
    message: 'Limite de requisições excedido. Por favor, tente novamente mais tarde.'
});


module.exports = limiterMiddleware
