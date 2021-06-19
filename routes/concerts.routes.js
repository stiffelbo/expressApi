const express = require('express');
const router = express.Router();

const concertsController = require('../controllers/concerts.controller');

router.get('/concerts/', concertsController.getAll);

router.get('/concerts/random', concertsController.getRandom);

router.get('/concerts/:id', concertsController.getById);

router.post('/concerts/', concertsController.postOne);

router.put('/concerts/:id', concertsController.updateById);

router.delete('/concerts/:id', concertsController.deteleById);

module.exports = router;