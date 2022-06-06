const express = require('express');
const receitasController = require('./../controllers/receitasController');

const router = express.Router();

router
  .route('/')
  .get(receitasController.pegarReceitas)
  .post(receitasController.adicionarReceita);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
