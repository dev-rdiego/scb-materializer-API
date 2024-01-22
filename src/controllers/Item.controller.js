const Item = require('../models/Item.model');

const controller = {};

// Get all items & Search items by name (partial or similar match)
controller.searchByNameOrGetAll = async (req, res) => {
    try {
        const itemName = req.query.name;

        if (!itemName) {
            // If name parameter is not provided, return all items
            const items = await Item.find();
            res.status(200).json({ amount: items.length, items: items });
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
}

// Get item by ID
controller.getOneByID = async (req, res) => {
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
};

// Add a new item
controller.addNew = async (req, res) => {
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
};

// Add multiple items
controller.addMany = async (req, res) => {
    try {
        const itemsToAdd = req.body;

        if (!itemsToAdd || !Array.isArray(itemsToAdd) || itemsToAdd.length === 0) {
            res.status(400).json({ message: 'Invalid or empty array of items provided' });
            return;
        }

        const insertedItems = await Item.insertMany(itemsToAdd);
        const amount = insertedItems.length;

        res.status(201).json({ message: 'Items added successfully', amount: amount, items: insertedItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update item by ID
controller.fullUpdate = async (req, res) => {
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
};

// Update specific fields of an item by ID
controller.partialUpdate = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;

        // Check if the updates object is empty
        if (Object.keys(updates).length === 0) {
            res.status(400).json({ message: 'Item not updated due to empty params' });
            return;
        }

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
};

// Delete item by ID
controller.deleteOneByID = async (req, res) => {
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
};

// Delete all items
controller.deleteAll = async (req, res) => {
    try {
        await Item.deleteMany({}); // Deletes all items

        const timestamp = new Date().toLocaleString("en-US", { timeZone: 'America/El_Salvador' }) // Get current date and time in El Salvador

        res.status(200).json({ message: 'All items deleted successfully', timestamp: timestamp }); // Send response with deleted items
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = controller;