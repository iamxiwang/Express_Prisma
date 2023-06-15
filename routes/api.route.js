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
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/jokes', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.delete('/jokes/:id', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.patch('/jokes/:id', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});


module.exports = router;
