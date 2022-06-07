const express = require('express')
const server = express()
const port = 3000

server.listen(port, ()=> console.log('listening'))

server.get("/", (req,res) => {
    res.sendFile(__dirname + "/static/signUp.html")
})