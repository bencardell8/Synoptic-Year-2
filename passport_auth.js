const LocalStrategy = require('passport-local').Strategy
const client = require("./database")

/* storing database information */


/* function for initialisation of passport */
function startAuthentication(passport) {
    /* show function has been executed */
    console.log("PassportJS Authentication Running.")

    const authUser = (email, password, done) =>{
        /* query to check for user */
        client.query(`SELECT * FROM users WHERE email = $1`, [email], (err, result) =>{
            /* throw error if present */
            if(err) {
                throw err;
            }
            /* check if a database entry exists */
            if (result.rows.length > 0) {
                /* store user details */
                const user = result.rows[0]
                /* compare entered password to actual password in database */
                if (user.password === password) {
                    console.log(`User ${user.email} logged in.`);
                    return done(null, user)
                }
                /* check if passwords do not match print error */
                if (user.password != password) {
                    console.log("Invalid password.")
                    return done(null, false, {message: "Incorrect password."})
                }             
                /* user does not exist in database */
            } else {
                console.log("User not found in database.")
                return done(null, false, {message: "User not found in database."})
            }
        })
    }

    passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, authUser));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        client.query(`SELECT * FROM users WHERE id = $1`, [id], (err, result) => {
            if (err) {
                return done(err);
            }
            return done(null, result.rows[0]);
        })
    })

}

module.exports = startAuthentication;