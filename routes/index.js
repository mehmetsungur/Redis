const TestRouterFn = require("./test.js");
const RedisRouterFn = require("./redis.js");

const RouterArrFns = [
    TestRouterFn,
    RedisRouterFn
];

module.exports = RouterArrFns;