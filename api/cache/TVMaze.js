const ENV   = require('../ENV')

const redis = require('redis')



const redisClient = redis.createClient({
    socket: {
        host:               ENV.REDIS_CONFIG.HOST
    ,   port:               ENV.REDIS_CONFIG.PORT
    ,   reconnectStrategy:  () => (ENV.REDIS_CONFIG.RETRY_MS)
    }
})



module.exports = redisClient
