const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
console.log(secretOrKey)
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
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
exports.loginUser = async function(user) {
    const userInfo = {
        id: user.id,
        firstName:user.firstName,
        email: user.email
    };
    const token = await jwt.sign(
      userInfo, // payload
      secretOrKey, // sign with secret key
      { expiresIn: 3600 } // tell the key to expire in one hour
    );
    return {
        user: userInfo,
        token
    };
};

// verify jwt
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findUnique({
            where: {
                id:jwtPayload.id
                }
            })
        if (user) {
        // return the user to the frontend
        return done(null, user);
        }
        // return false since there is no user
        return done(null, false);
    }
    catch(err) {
        done(err);
    }
}));
exports.requireUser = passport.authenticate('jwt', { session: false });
exports.restoreUser = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, function(err, user) {
        if (err) return next(err);
        if (user) req.user = user;
        next();
    })(req, res, next);
};