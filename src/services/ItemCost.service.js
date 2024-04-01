const Item = require('../models/Item.model');
const { formatTime } = require('../utils');

// Helper function to calculate the total cost and time recursively

/**
 * Asynchronously calculates the total cost and production time for crafting a specified item and its dependencies.
 *
 * @param {string} itemId - The ID of the item to calculate the cost for.
 * @param {Array} [result=[]] - Accumulator for the result.
 * @param {number} [desiredAmount=1] - The desired amount of the item to be crafted.
 * @returns {Object} An object containing the total cost and total production time.
 */
const calculateTotalCost = async (itemId, result = [], desiredAmount = 1, includeTime = false) => {
    // Retrieve item information from the database
    const item = await Item.findOne({ id: itemId });

    // If item is not found, return an object with total cost as the result
    if (!item) return { totalCost: result };

    // Get the cost of crafting the item
    const itemsCost = item.cost;

    // Iterate through the cost items
    for (const costItem of itemsCost) {
        const { id, amount } = costItem;

        // Find the item in the database
        const foundItem = await Item.findOne({ id });

        // If the item is not found, continue to the next iteration
        if (!foundItem) continue;

        // If the found item is a primitive item, calculate its total amount and push it to the result array
        if (foundItem.is_primitive) {
            includeTime
                ?
                result.push({ id: foundItem.id, name: foundItem.name, productionTime: foundItem.production_time, amount: amount * desiredAmount })
                :
                result.push({ id: foundItem.id, name: foundItem.name, amount: amount * desiredAmount });
            // If the found item is not a primitive item, recursively calculate its total cost
        } else {
            includeTime
                ?
                await calculateTotalCost(id, result, amount * desiredAmount, true)
                :
                await calculateTotalCost(id, result, amount * desiredAmount);
        }
    }


    // Return an object containing the total cost and total production time
    return result;
};


const calculateTotalTime = (baseItem, desiredAmount, rawMaterials, storeLevel = 0, factoriesOwned = 1, factoryLimit = 2) => {
    rawMaterials = [
        {
            "id": 1,
            "name": "Metal",
            "productionTime": 1,
            "amount": 2
        },
        {
            "id": 2,
            "name": "Wood",
            "productionTime": 3,
            "amount": 4
        }
    ]

    let timeReductionFactor;
    let totalProductionTime = [];

    switch (storeLevel) {
        case 1:
            timeReductionFactor = 0.9;
            break;
        case 2:
            timeReductionFactor = 0.85;
            break;
        case 3:
            timeReductionFactor = 0.8;
            break;
        default:
            timeReductionFactor = 1;
    }


    rawMaterials.forEach((material, index) => {
        totalProductionTime[index] = {
            name: material.name,
            productionTime: material.productionTime * material.amount * timeReductionFactor,
        }
    });

    return totalProductionTime;
}


// Export the helper function
module.exports = {
    calculateTotalCost
};
