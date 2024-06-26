const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderControllers');

router.post('/place-order', ordersController.placeOrder);

module.exports = router;