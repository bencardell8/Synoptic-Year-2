const express = require('express')
const server = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')
const {Client} = require ('pg')

server.use(bodyParser.urlencoded({ extended: false}))
server.use(express.static(__dirname));
server.use(express.urlencoded({ extended: true}))
server.set("view engine", "ejs");

/*
const startAuthentication = require('./passport_auth')
const passport = require('passport')
startAuthentication(passport)
*/


server.get("/", (req,res) => {
    res.render('signup.ejs', {error: ""});
})

server.get("/login", (req,res) => {
    res.render('login.ejs', {error: ""});
})


server.get("/account", (req,res) => {
    res.render('account-info.ejs', {error: ""});
})

/*
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
*/
/*
server.get("/login", (req,res) => {
    res.sendFile(__dirname + "/static/login.html")
})
*/
server.get("/about", (req,res) => {
    res.sendFile(__dirname + "/static/about.html")
})
/*
server.get("/account", (req,res) => {
    res.sendFile(__dirname + "/static/account-info.html")
})
*/
server.get("/contact", (req,res) => {
    res.sendFile(__dirname + "/static/contact.html")
})

server.get("/editaccount", (req,res) => {
    res.sendFile(__dirname + "/static/account-edit.html")
})


server.post("/saveUser", (req,res) => {

    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "synopticDB",
        password: "password",
        port: 5432,
    });

    client.connect();

        
    const insertData = `INSERT INTO users (email, password)
                VALUES ('${req.body.email}', '${req.body.password}')`;

    client.query(insertData, (err) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.")
            client.end();
            res.render('signup.ejs', {error: `Error: Email '${req.body.email}' already registered.`})

        } else {
            console.log('Data saved to database.');
            client.end();
            res.redirect("/contact")
        }
    });

})

server.post("/loginUser", (req, res) => {

    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "synopticDB",
        password: "password",
        port: 5432,
    });

    client.connect();


    const loginData = `SELECT * FROM users WHERE email = '${req.body.email}'
                        AND password = '${req.body.password}'`;

    console.log(loginData)
    
    client.query('SELECT email, password FROM users WHERE email=$1', [req.body.email], (err, result) => {
        if (err) {
            console.error(err);
            console.log("Error likely caused by incorrect login details.")
            client.end();
            res.render('login.ejs', {error: 'Error: Incorrect login details.'})
            /* checking if user data present in DB */
        } if (result.rows.length > 0) {
            /* finding the valid password for that user */
            const checkPass = result.rows[0].password
            /* checking if password entered matches actual password */
            if (checkPass === req.body.password) {
                console.log(`User ${req.body.email} logged in.`);
                client.end();
                res.render('account-info.ejs', {userEmail: result.rows[0].email})
            } else {
                client.end();
                res.render('login.ejs', {error: 'Error: Incorrect login details.'})
                console.log(`Invalid password for ${req.body.email}`)
            }
        } else {
            client.end();
            res.render('login.ejs', {error: 'Error: Incorrect login details.'})
            console.log(`User ${req.body.email} not valid.`)

        }
    });

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
