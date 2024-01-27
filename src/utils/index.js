const Item = require('../models/Item.model');

async function calculateTotalCost(itemId, result = [], desiredAmount = 1) {
    const item = await Item.findOne({ id: itemId });

    if (!item) return result;

    const itemsCost = item.cost;

    for (const costItem of itemsCost) {
        const { id, amount } = costItem;
        const foundItem = await Item.findOne({ id: id });

        if (!foundItem) continue;

        if (foundItem.is_primitive) {
            const totalAmount = amount * desiredAmount;

            result.push({ name: foundItem.name, amount: totalAmount });

        } else {
            await calculateTotalCost(id, result, amount * desiredAmount);
        }
    }

    return result;
}



module.exports = {
    calculateTotalCost
};
