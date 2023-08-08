const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { loginUser } = require('../config/passport');

router.get('/', async (req, res, next) => {
    try{
        const users = await prisma.user.findMany({})
        res.json(users)
    }catch (error) {
        next(error)
    }
});

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    //  Check to make sure no one has already registered with the proposed email or username.
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: req.body.email },
                    { firstName: req.body.firstName, lastName: req.body.lastName }
                ]
            }
        });

        if (existingUser) {
            // Throw a 400 error if the email address and/or username already exists
            const err = new Error("Validation Error");
            err.statusCode = 400;
            const errors = {};
            if (existingUser.email === req.body.email) {
                errors.email = "A user has already registered with this email";
            }
            if (
                existingUser.firstName === req.body.firstName &&
                existingUser.lastName === req.body.lastName
            ) {
                errors.name = "A user has already registered with this name";
            }
            
            err.errors = errors;
            return next(err);
        }
            // If the query fails to find anyone, then you are good to create and save the new user in the database! (For now, just assume that the input is valid; you will add validations in a few phases.)

            // Create a new User with the given email and username. Don't include the password: you don't want to store the password in plain text! Instead, use bcrypt to create a salted and encrypted password hash that can be stored in the new user's hashedPassword field. Then save the user to the database and return it as JSON. (Once you set up Passport, you will want to log in the newly created user as well.)
            
            try {
                    // // Generate a salt
                    // bcrypt.genSalt(10, async (err, salt) => {
                    // if (err) throw err;
                
                    // // Hash the password using the generated salt
                    // bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
                    //     if (err) throw err;
                
                    //     try {
                    //     // Create a new user with hashedPassword
                    //     const newUser = await prisma.user.create({
                    //         data: {
                    //             email: req.body.email,
                    //             firstName: req.body.firstName,
                    //             lastName: req.body.lastName,
                    //             hashedPassword: hashedPassword
                    //         }
                    //     });
                
                    //     // Return the newly created user
                    //     res.json({ user: newUser });
                    //     } catch (error) {
                    //     next(error);
                    //     }
                    // });
                    // });
                     // Generate a salt
                    const salt = await bcrypt.genSalt(10);

                    // Hash the password using the generated salt
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);

                    // Create a new user with hashedPassword
                    const newUser = await prisma.user.create({
                    data: {
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        hashedPassword: hashedPassword
                    }
                    });

                    // Return the newly created user
                    return res.json(await loginUser(newUser));
                } catch (error) {
                    next(error);
                }

    
});

// POST /api/users/login
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', async function(err, user) {
        if (err) return next(err);
        if (!user) {
            const err = new Error('Invalid credentials');
            err.statusCode = 400;
            err.errors = { email: "Invalid credentials" };
            return next(err);
        }
        return res.json(await loginUser(user));
    })(req, res, next);
});

module.exports = router;