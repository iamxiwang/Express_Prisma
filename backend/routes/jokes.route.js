const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()




router.get('/jokes', async (req, res, next) => {
    try{
        const jokes = await prisma.joke.findMany({})
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
    const joke = await prisma.joke.create({data: req.body})
    res.json(joke)
  } catch (error) {
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
    res.json(deletedJoke)
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
