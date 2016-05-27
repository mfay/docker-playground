var expressSession = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(expressSession);

module.exports = function Sessions(host, port, secret) {
	var store = new RedisStore({ client: redis.createClient(port, host) });
	var session = expressSession({
		secret: secret,
		store: store,
		resave: true,
		saveUninitialized: true
	});
	store.client.on('connect', function() {
		console.log({ type: 'info', msg: 'connected', service: 'redis' });
	});

	store.client.on('error', function(err) {
		console.log({ type: 'error', msg: 'error', service: 'redis', err: err.stack || err.message });
	});

	store.client.on('end', function() {
		console.log({ type: 'error', msg: 'disconnected', service: 'redis' });
		throw new Error('Disconnected from redis');
	});

	return session;
};
