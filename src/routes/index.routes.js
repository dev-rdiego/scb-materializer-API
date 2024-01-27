var express = require('express');
var router = express.Router();

const itemsRouter = require('./items.routes');
const itemCostRouter = require('./item-costs.routes');

const RenderHomePage = (req, res, next) => res.render('index', { title: 'Express' });

/* GET home page. */
router.get('/', RenderHomePage);
router.use('/items', itemsRouter);
router.use('/item-cost', itemCostRouter);

module.exports = router;
