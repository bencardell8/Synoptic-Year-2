const express = require('express')
const server = express()
const port = 3000
const bodyParser = require('body-parser')

server.use(bodyParser.urlencoded({ extended: false}))
server.use(express.static(__dirname));
server.use(express.urlencoded({ extended: true}))

server.get("/", (req,res) => {
    res.sendFile(__dirname + "/static/signUp.html")
})








server.listen(port, ()=> console.log('listening'))
