
module.exports = {
	SESSION_SECRET: process.env.SESSION_SECRET||"not-so-secret",
	REDIS_HOST: process.env.REDIS_HOST||"redis",
	REDIS_PORT: process.env.REDIS_PORT||6379
}
