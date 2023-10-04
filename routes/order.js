const router = require('express').Router();
const orderController = require('../controllers/orderControllers')

router.get('/:id', orderController.getUserOrders)

module.exports = router;
