const express = require('express');
const router = express.Router();

const concertsController = require('../controllers/concerts.controller');

router.get('/concerts/performer/:performer', concertsController.getByPerformer);

router.get('/concerts/genre/:genre', concertsController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', concertsController.getByPrices);

router.get('/concerts/price/day/:day', concertsController.getByDay);

router.get('/concerts/', concertsController.getAll);

router.get('/concerts/random', concertsController.getRandom);

router.get('/concerts/:id', concertsController.getById);

router.post('/concerts/', concertsController.postOne);

router.put('/concerts/:id', concertsController.updateById);

router.delete('/concerts/:id', concertsController.deteleById);

module.exports = router;