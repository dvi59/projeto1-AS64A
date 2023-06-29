const redis = require('redis');

const redisHost = 'localhost'; // Host do Redis (pode ser um endereço IP ou nome de host)
const redisPort = 6379; // Porta do Redis
const redisPassword = 'root'

const client = redis.createClient({
    host: redisHost,
    port: redisPort,
    password: redisPassword,
  })

export { client }