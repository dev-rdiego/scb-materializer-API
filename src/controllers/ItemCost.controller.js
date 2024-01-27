const Item = require('../models/Item.model');
const { calculateTotalCost } = require('../utils');

const controller = {};

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

        // Calculate total cost recursively and await the result
        const totalCost = await calculateTotalCost(item.id, [], desiredAmount);

        // Send response with total cost
        res.status(200).json({
            name: item.name,
            rawMaterials: totalCost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

            const totalCost = await calculateTotalCost(itemId, [], requestedAmount);

            totalCosts.push({
                name: itemDetails.name,
                rawMaterials: totalCost
            });
        }

        res.status(200).json(totalCosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = controller;