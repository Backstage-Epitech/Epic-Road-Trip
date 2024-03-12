console.clear()

const express = require("express")

const router = express.Router()

router.get('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.send('hello world')
})

module.exports = router
