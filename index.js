require("express-async-errors");

const express = require('express');
const helmet = require('helmet');
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

app.listen(80, () => {
    console.log('express server using 80 port')
})