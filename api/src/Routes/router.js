console.clear()

const express = require("express");
const { signup, login } = require("../Controllers/userController");

const router = express.Router()

router.get('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.send('hello world')
});
router.post('/signup', signup);
router.post('/login', login);

module.exports = router
