var express = require('express');
var router = express.Router();
const controller = require('../controllers/ItemCost.controller');


// GET: Get total cost of an item by ID
router.get('/:id', controller.getTotalCost);

// GET: Get total cost of many items by their ID
router.get('/', controller.getManyTotalCost);

module.exports = router;