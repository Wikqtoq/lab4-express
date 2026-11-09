const express = require('express');
const { body, param } = require('express-validator');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID musi być liczbą całkowitą dodatnią')
], usersController.getById);

router.post('/', [
  body('name').trim().notEmpty().withMessage('Pole name jest wymagane'),
  body('email').isEmail().withMessage('Niepoprawny format adresu email')
], usersController.create);

router.put('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID musi być liczbą całkowitą dodatnią'),
  body('name').trim().notEmpty().withMessage('Pole name jest wymagane'),
  body('email').isEmail().withMessage('Niepoprawny format adresu email')
], usersController.update);

router.delete('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID musi być liczbą całkowitą dodatnią')
], usersController.remove);

module.exports = router;
