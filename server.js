const express = require('express')
const server = express()
const port = 3001
const bodyParser = require('body-parser')
const client = require("./database")
const passport = require('passport')
const session = require("express-session");
const flash = require("express-flash");

server.use(bodyParser.urlencoded({ extended: false}))
server.use(express.static(__dirname));
server.use(express.urlencoded({ extended: true}))
server.set("view engine", "ejs");


/* initialisation function for passport.js */ 
const startAuthentication = require('./passport_auth');
startAuthentication(passport);


server.use(session({
    secret: 'secure_secret',
    resave: false,
    saveUninitialized: false
}))

// initialisation of session, passport, and flash
server.use(passport.initialize());
server.use(passport.session())
server.use(flash());

server.get("/", checkAuthenticated, (req,res) => {
    res.render('signup.ejs', {error: ""});
})

server.get("/login", checkAuthenticated, (req,res) => {
    res.render('login.ejs');
})

server.get("/market", checkNotAuthenticated, (req,res) => {
    res.render('market.ejs')
})

server.get("/account", checkNotAuthenticated, (req,res) => {
    res.render('account-info.ejs', {user: req.user.email, dollars: req.user.dollars, interest: req.user.interest});
})

server.get("/editaccount", checkNotAuthenticated, (req,res) => {
    res.render('account-edit.ejs', {user: req.user.email})
})

server.get("/about", checkNotAuthenticated, (req,res) => {
    res.render('about.ejs')
})

server.get("/contact", checkNotAuthenticated, (req,res) => {
    res.render('contact.ejs')
})

/* upon logout the session is terminated and user is redirected to login page */
server.get("/logout", (req,res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        req.flash("success_msg", "Logged out!")
        res.render('login.ejs')
    });
    
});


/* post method for setting amount */
server.post("/setAmount", (req, res) => {

    /* amount user wants to invest */
    let amount = req.body.amount;
    let email = req.user.email;

    /* running query against database */
    client.query('UPDATE users SET dollars = $1 WHERE email = $2', [amount, email], (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`User ${email} updated their investment amount.`)
            res.redirect("/account")
        }
    });
});

/* post method for setting interest */
server.post("/setInterest", (req, res) => {

    /* amount user wants to invest */
    let interest = req.body.interest;
    let email = req.user.email;

    /* running query against database */
    client.query('UPDATE users SET interest = $1 WHERE email = $2', [interest, email], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`User ${email} updated their interest rate.`);
            res.redirect("/account");
        }
    });
});

/* post method for updating a user's password */
server.post("/updatePassword", (req, res) => {

    /* store user's new password */
    let newPassword = req.body.password;
    let email = req.user.email;

    /* running query against database */
    client.query('UPDATE users SET password = $1 WHERE email = $2', [newPassword, email], (err) => {
        if(err) {
            console.error(err);
        } else {
            /* update user's password and log them out */
            console.log(`Updated password for ${email}.`)
            req.logout(req.user, err => {
                if(err) return next(err);
                req.flash("success_msg", "Password updated! Please log in again.")
                res.render('login.ejs')
            });
        }
    });
});


/* post method for a new user creating an account */
server.post("/saveUser", (req,res) => {

    /* store user's email and password */
    let email = req.body.email;
    let password = req.body.password

    /* running query against database */
    client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password], (err) => {
        /* if the email already exists an error is displayed */
        if (err) {
            console.error(err);
            console.log("Error likely caused by duplicate email.");
            res.render('signup.ejs', {error: `Email '${req.body.email}' already registered.`});
        /* if the email is not present in the database, the account is added */
        } else {
            console.log('User data saved to database.');
            req.flash("success_msg", "Account created! Please log in.");
            res.redirect("/login");
        }
    });

});

 /* passport.js middleware for authetication requests. */
server.post("/loginUser", passport.authenticate("local", {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true
}));


/* check if a user is authenticated and redirects them back to their account page */
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/account");
    }
    next();
  }
  
/* if a user is not authenticated they are redirected back to the login page */
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
  

/* displays server address and port in console */
server.listen(port, ()=> {
    console.log(`Listening to http://localhost:${port}`);
}); 
