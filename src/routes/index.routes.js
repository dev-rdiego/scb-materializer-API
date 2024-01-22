var express = require('express');
var router = express.Router();

const itemsRouter = require('./items.routes');

const RenderHomePage = (req, res, next) => res.render('index', { title: 'Express' });

/* GET home page. */
router.get('/', RenderHomePage);
router.use('/items', itemsRouter)

module.exports = router;
