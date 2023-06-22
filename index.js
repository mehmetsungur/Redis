require("express-async-errors");

const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const Models = require("./mongodb/index.js");

const ExampleDataFormation = require("./mongodb/data/index.js");

const RouterFns = require('./routes/index.js');
const app = express();
const router = express.Router();

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

mongoose.connect("mongodb+srv://redis:Falcon21@redis.tofbtfn.mongodb.net/?retryWrites=true&w=majority").then(async () => {
    console.log("MongoDB Connected");
    console.log("ExampleDataFormation Started");
    await ExampleDataFormation();
}).catch(err => {
    console.log(err);
})

app.listen(80, () => {
    console.log('express server using 80 port');
})