const Item = require('../models/Item.model');

// Helper function to calculate the total cost and time recursively
const calculateTotalCost = async (itemId, result = [], desiredAmount = 1, times = {}) => {
    const item = await Item.findOne({ id: itemId });

    if (!item) return { totalCost: result, };

    if (!times[item.name]) times[item.name] = item.production_time * desiredAmount;

    const itemsCost = item.cost;

    for (const costItem of itemsCost) {
        const { id, amount } = costItem;
        const foundItem = await Item.findOne({ id });

        if (!foundItem) continue;

        if (foundItem.is_primitive) {
            const totalAmount = amount * desiredAmount;

            if (!times[foundItem.name]) times[foundItem.name] = foundItem.production_time;
            result.push({ name: foundItem.name, amount: totalAmount });

        } else {
            if (!times[foundItem.name]) times[foundItem.name] = foundItem.production_time * desiredAmount;
            await calculateTotalCost(id, result, amount * desiredAmount, times);
        }
    }

    console.log({ 'times: ': times, 'result: ': result });
    const totalTime = Object.values(times).reduce((a, b) => a + b, 0);


    return { totalCost: result, totalTime };
};


// Export the helper function
module.exports = {
    calculateTotalCost
};
