const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonials.controller');


router.get('/testimonials/', testimonialsController.getAll);

router.get('/testimonials/random', testimonialsController.getRandom);

router.get('/testimonials/:id', testimonialsController.getById);

router.post('/testimonials/', testimonialsController.postOne);

router.put('/testimonials/:id', testimonialsController.updateById);

router.delete('/testimonials/:id', testimonialsController.deteleById);

module.exports = router;