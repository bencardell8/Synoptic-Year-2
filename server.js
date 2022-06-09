const express = require('express')
const server = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')
const {Client} = require ('pg')

server.use(bodyParser.urlencoded({ extended: false}))
server.use(express.static(__dirname));
server.use(express.urlencoded({ extended: true}))

server.get("/", (req,res) => {
    res.sendFile(__dirname + "/static/signup.html")
})

server.post("/", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    res.setHeader('Content-type','text/html')

    //console.log("Data has been saved: Email = " + email + ", Password = " + password)

    console.log("Data has been saved: " + JSON.stringify(req.body))

    var loginDetails = Date.now()
    loginDetails += ".txt"

    fs.appendFile(loginDetails, JSON.stringify(req.body), function(err){
        if (err) throw err;
        console.log('Data Saved')
    })

    res.redirect("/about")
})

server.get("/login", (req,res) => {
    res.sendFile(__dirname + "/static/login.html")
})

server.get("/about", (req,res) => {
    res.sendFile(__dirname + "/static/about.html")
})

server.get("/account", (req,res) => {
    res.sendFile(__dirname + "/static/account-info.html")
})

server.get("/editaccount", (req,res) => {
    res.sendFile(__dirname + "/static/account-edit.html")
})

/*server.post("/load_from_db", function(req,res){
    var body = ""
    req.on("data", function(data){
        body+=data;
    })

    var json = JSON.parse(body)
    var email = json.email;

    req.on("end", async function(){
        const client = new Client({
            user: "postgres",
            host: "localhost",
            database: "synopticDB",
            password: "password",
            port: 5432,
        })
        await client.connect()
        await client.query("SET search_path TO 'public';")

        const text = "SELECT password FROM users WHERE email = $1;"
        const values = id;
        const res1 = await client.query (text, values)
        console.log(rows1)

        var result = rows1.email

        res.send(result)

        await client.end()
    })
})
*/




server.listen(port, ()=> {
    console.log(`Listening to http://localhost:${port}`)
}); 
