const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const User = prisma.user


passport.use(
    new LocalStrategy(
        {
            // The session option in the LocalStrategy constructor is used to control whether Passport.js should support persistent login sessions.
            session: false,
            usernameField: 'email',
            passwordField: 'password',
    }, async function (email, password, done) {
        try{
            const user = await User.findUnique({ 
                where:{email}
            });
            if (user) {
                bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
                    if (err || !isMatch){
                        return done(null, false)
                    }else{
                        return done(null, user)
                    };
                });
            } else{
                done(null, false)
            }
        } catch(error){
            return done(error)
        };
}));