var express = require('express');
var router = express.Router();

/* GET all items */
router.get('/', function (req, res, next) {
    // Access query parameters using req.query
    const itemName = req.query.name;

    switch (true) {
        case Boolean(itemName):
            res.send({ data: `Item with name ${itemName}` });
            break;
        default:
            res.send({ data: ['item 1', 'item 2', 'item 3'] });
            break;
    }
});

router.get('/:id', function (req, res, next) {

    const itemId = req.params.id;

    if (itemId) {
        res.send({ data: `Item with ID ${itemId}` });
    }
});

module.exports = router;
