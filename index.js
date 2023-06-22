require("express-async-errors");

const mongoose = require("mongoose");
const express = require('express');
const helmet = require('helmet');
const Models = require("./mongodb/index.js");

const RouterFn = require('./routes/index.js');
const app = express();
const router = express.Router();

RouterFn.forEach((routerFn, index) => {
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
        test: "succesful",
        createdAt: new Date().toUTCString()
    })
})

app.use("/api", router);

mongoose.connect("mongodb+srv://mehmetsungur:Falcon21@second.aojeiid.mongodb.net/redis?retryWrites=true&w=majority").then(() => {
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err);
})

app.listen(80, () => {
    console.log('express server using 80 port')
})