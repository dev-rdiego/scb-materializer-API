var express = require('express');
var router = express.Router();
const controller = require('../controllers/item.controller');

// GET:  Get all items & Search items by name (partial or similar match)
router.get('/', controller.searchByNameOrGetAll);

// GET: Get item by ID
router.get('/:id', controller.getOneByID);

// POST: Add a new item
router.post('/', controller.addNew);

// POST: Add multiple items
router.post('/add-many', controller.addMany);

// PUT: Update item by ID
router.put('/:id', controller.fullUpdate);

// PATCH: Update specific fields of an item by ID
router.patch('/:id', controller.partialUpdate);

// DELETE: Delete item by ID
router.delete('/:id', controller.deleteOneByID);

// DELETE: Delete all items
router.delete('/', controller.deleteAll);

module.exports = router;