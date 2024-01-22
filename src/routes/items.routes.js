var express = require('express');
var router = express.Router();
const Item = require('../models/Item.model');


// GET: Get all items &  Search items by name (partial or similar match)
router.get('/', async (req, res) => {
    try {
        const itemName = req.query.name;

        if (!itemName) {
            // If name parameter is not provided, return all items
            const items = await Item.find();
            res.status(200).json(items);
            return;
        }

        // Use a case-insensitive regex for a partial or similar match
        const regex = new RegExp(itemName, 'i');
        const items = await Item.find({ name: regex });

        if (!items || items.length === 0) {
            res.status(404).json({ message: 'No items found matching the provided name' });
            return;
        }

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
        // Find item by ID
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

        // Check if the provided id already exists
        const existingItem = await Item.findOne({ id });

        // If item with the same id already exists, return an error
        if (existingItem) return res.status(400).json({ message: 'Item with the same ID already exists' });

        // Create a new item using the Item model and save it to the database
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

        // Find item by ID and update it with all the fields
        const updatedItem = await Item.findOneAndUpdate(
            { id: itemId },
            { name, is_primitive, cost },
        );

        if (!updatedItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        // Send response with updated item
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

        // Find item by ID and update it with the provided fields
        const updatedItem = await Item.findOneAndUpdate(
            { id: itemId },
            { $set: updates },
        );

        if (!updatedItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        // Send response with old item
        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
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

        // If item is not found, return an error
        if (!deletedItem) { res.status(404).json({ message: 'Item not found' }); return; }

        // Send response with deleted item
        res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE: Delete all items
router.delete('/', async (req, res) => {
    try {
        await Item.deleteMany({}); // Deletes all items
        res.status(200).json({ message: 'All items deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
