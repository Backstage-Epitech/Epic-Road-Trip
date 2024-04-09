const express = require("express");
const cors = require("cors");
const { signup, login } = require("../Controllers/userController");

const app = express();

// Utilisez cors pour gérer les autorisations CORS
app.use(cors());

app.get('/', (req, res, next) => {
    res.send('hello world');
});

app.post('/signup', signup);
app.post('/login', login);

module.exports = app;
