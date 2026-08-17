const { createClient }=require('redis');

const redisClient = createClient({
    username: 'default',
    password:process.env.REDIS_PASS,
    socket: {
        host: 'chess-stamp-brown-58374.db.redis.io',
        port: 13069
    }
});
module.exports=redisClient;