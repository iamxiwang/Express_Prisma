const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const Redis = require('ioredis'); // Import the Redis library

const redisClient = new Redis({
  host: 'localhost', // or '127.0.0.1' if Redis is running locally
  port: 6379, // default Redis port

})              

router.get('/jokes', async (req, res, next) => {
    try{
        const cachedJokes = await redisClient.get('jokes')
        if(cachedJokes){
          const jokes = JSON.parse(cachedJokes)
          return res.json(jokes)
        }
        // If data is not cached, fetch it from your database (Prisma)
        const jokes = await prisma.joke.findMany({})
        // Store the data in Redis with an expiration time (e.g., 1 hour)
        await redisClient.set('jokes', JSON.stringify(jokes), 'ex', 3600);
        res.json(jokes)

    }catch (error) {
      next(error)
    }
});

router.get('/jokes/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const joke = await prisma.joke.findUnique({
      where: {
        id : Number(id)
      }
    })
    res.json(joke)
  } catch (error) {
    next(error)
  }
});



router.post('/jokes', async (req, res, next) => {
  try {
    const joke = await prisma.joke.create({
      data: req.body
    })
    res.json(joke)
  } catch (error) {
    console.error(error);
    next(error)
  }
});


router.delete('/jokes/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const deletedJoke = await prisma.joke.delete({
      where: {
        id : Number(id)

      }
    })
    if (!deletedJoke) {
      return res.status(404).json({ message: 'Joke not found' });
    }
    res.json({ message: 'Joke deleted successfully' })
  } catch (error) {
    next(error)
  }
});

router.patch('/jokes/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const joke = await prisma.joke.update({
      where:{
        id : Number(id), 
      },
      data: req.body
    })

    res.json(joke)

  } catch (error) {
    next(error)
  }
});


module.exports = router;
