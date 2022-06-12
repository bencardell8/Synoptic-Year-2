
/*
const LocalStrategy = require('passport-local').Strategy

function startAuthentication(passport, getUserEmail) {

    const authenticateUser = (email, password, done) => {
        const user = getUserEmail(email)
        if (user == null) {
            return done(null, false, {message: "No user in DB found."})
        }

        try {
            if ()
            
        } catch (error) {
            
        }

    }

    passport.use(new LocalStrategy({usernameField: 'email'}), authenticateUser)
    passport.serialiseUser((user, done) => {})
    passport.deserialiseUser((id, done) => {})

}

modules.export

*/