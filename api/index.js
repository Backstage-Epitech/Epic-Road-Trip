console.clear()

// LIBRARY DECLARATION
const express = require("express")
const logger = require("./src/components/logs")
const ejs = require("ejs")
const http = require("http")


const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./models/index')
const userRoutes = require('./src/Routes/router')
const cors = require('cors');


// CONSTANT DECLARATION 
logger.actionLog("[MAIN] - Creating the express app")
const app = express()
app.use(express.json())


logger.actionLog("[MAIN] - Creating the main router")
const router = require("./src/Routes/router")
app.use("/", router)


logger.actionLog("[MAIN] - Creating the web server")
const SERVER = http.createServer(app)
const PORT = 8081

//middleware
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true, parameterLimit: 1000000}));
app.use(cookieParser())

app.use(cors({
    origin: '*'
}));

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})
// https://www.npmjs.com/package/postgres
// https://www.npmjs.com/package/rss-parser


app.use('/api/', userRoutes)


const IO = require("socket.io")(SERVER)

logger.actionLog(`[MAIN] - Starting Web server on port ${PORT}`)
SERVER.listen(PORT)
logger.infoLog(`[MAIN] - Listenning on port ${PORT}`)
