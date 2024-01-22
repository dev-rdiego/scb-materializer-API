var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ data: ['user 1', 'user 2', 'user 3'] });
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  res.send({ id: id, data: 'respond with a resource' });
});


module.exports = router;
