const redis = require("redis");
const util = require("util");
const client = redis.createClient();
client.get = util.promisify(client.get);
client.set = util.promisify(client.set);
module.exports = client;
