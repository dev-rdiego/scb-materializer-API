var express = require('express');
var router = express.Router();
const Item = require('../models/Item.model');


// GET: Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET: Get item by ID
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findOne({ id: itemId });

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST: Add a new item
router.post('/', async (req, res) => {
    try {
        const { id, name, is_primitive, cost } = req.body;
        const newItem = new Item({ id, name, is_primitive, cost });
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT: Update item by ID
router.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { name, is_primitive, cost } = req.body;

        const updatedItem = await Item.findOneAndUpdate(
            { id: itemId },
            { name, is_primitive, cost },
        );

        if (!updatedItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PATCH: Update specific fields of an item by ID
router.patch('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;

        const updatedItem = await Item.findOneAndUpdate(
            { id: itemId },
            { $set: updates },
            { new: true }
        );

        if (!updatedItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        const transformedItem = itemDto.transformItem(updatedItem);
        res.status(200).json({ message: 'Item updated successfully', item: transformedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE: Delete item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findOneAndDelete({ id: itemId });

        if (!deletedItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
