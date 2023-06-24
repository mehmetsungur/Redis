const { route } = require("express/lib/router");
const client = require("../redis/index.js");
module.exports = (router) => {
    /* TEST */
    router.get('/redis/test', async (req, res) => {
        res.json({
            message: 'Welcome to Redis Router'
        })
    })

    /* STRING */
    router.get('/redis/string', async (req, res) => {
        const KEY = 'string';
        let value = await client.get(KEY);
        if (!value) {
            console.log('Veri yazılıyor');
            const val = "Hello World :)";
            const write = await client.set(KEY, val);
            if (write === 'OK') {
                value = val;
            }
        }
        res.json({
            message: 'Redis String',
            value: value
        })
    })

    /* HASH */
    router.get('/redis/hash', async (req, res) => {
        const KEY = "hash";
        let value = await client.hGetAll(KEY);

        if (Object.keys(value).length === 0) {
            console.log("Veri yaziliyor..");
            await client.hSet(KEY, 'name', 'Mehmet Sungur');
            await client.hSet(KEY, 'age', 32);
            await client.hSet(KEY, 'phoneNumber', "456-785-67-86");
        }

        res.json({
            message: 'Redis Hash',
            value: value
        })
    })
}