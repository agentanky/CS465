var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');



/* GET travel page. */
router.get('/', (req, res, next) => {
  controller.travel(req, res, next);
});

module.exports = router;
