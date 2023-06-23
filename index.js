require("express-async-errors");

const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const Models = require("./mongodb/index.js");

const ExampleDataFormation = require("./mongodb/data/index.js");

const RouterFns = require('./routes/index.js');
const app = express();
const router = express.Router();
const client = require("./redis/index.js");

RouterFns.forEach((routerFn, index) => {
    routerFn(router);
})

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: '1mb'
}))

app.get('/test', async (req, res) => {
    res.json({
        test: "successful",
        createdAt: new Date().toUTCString()
    })
})

app.use("/api", router);

client.on('connect', () => {
    console.log("Redis Client Connected");
})

client.on('error', (err) => {
    console.log("Redis Client Error", err);
})

client.connect().then(() => {
    console.log("Redis Client Connected");
}).catch(err => {
    console.log(err);
})

mongoose.connect("mongodb+srv://ms:FqzMjcCwllhgGG9h@redis.zfooibf.mongodb.net/production?retryWrites=true&w=majority").then(async () => {
    console.log("MongoDB Connected");
    console.log("ExampleDataFormation Started");
    await ExampleDataFormation();
}).catch(err => {
    console.log(err);
})

app.listen(80, () => {
    console.log('express server using 80 port');
})