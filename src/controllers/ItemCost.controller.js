// Import the necessary modules
const Item = require('../models/Item.model');
const { calculateTotalCost } = require('../services/ItemCost.service');

// Define the controller object
const controller = {};

// Controller function to get the total cost of a single item
controller.getTotalCost = async (req, res) => {
    try {
        const itemId = req.params.id;
        const desiredAmount = req.query.amount || 1;

        // Find item by ID
        const item = await Item.findOne({ id: itemId });

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        // Calculate total cost and time recursively and await the result
        const { totalCost, totalTime } = await calculateTotalCost(item.id, [], desiredAmount);

        // Send response with total cost and time
        res.status(200).json({
            name: item.name,
            rawMaterials: totalCost,
            totaProductionTime: totalTime
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get the total cost of multiple items
controller.getManyTotalCost = async (req, res) => {
    try {
        const itemsArray = req.body; // Assuming the array is in the request body

        if (!Array.isArray(itemsArray) || itemsArray.length === 0) {
            res.status(400).json({ message: 'Invalid or empty array of items provided' });
            return;
        }

        const totalCosts = [];

        for (const item of itemsArray) {
            const itemId = item.id;
            const requestedAmount = item.amount || 1; // Default to 1 if amount is not provided

            const itemDetails = await Item.findOne({ id: itemId });

            if (!itemDetails) {
                res.status(404).json({ message: `Item with ID ${itemId} not found` });
                return;
            }

            // Calculate total cost and time recursively and await the result
            const { totalCost } = await calculateTotalCost(itemId, [], requestedAmount);

            totalCosts.push({
                name: itemDetails.name,
                requestedAmount,
                rawMaterials: totalCost,
            });
        }

        // Send response with total cost and time for each item
        res.status(200).json(totalCosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Export the controller object
module.exports = controller;