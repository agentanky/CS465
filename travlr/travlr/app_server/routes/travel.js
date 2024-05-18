var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

console.log('Controller:', controller);  // Add this log

/* GET travel page. */
router.get('/', (req, res, next) => {
  console.log('Travel route handler called');  // Add this log
  controller.travel(req, res, next);
});

module.exports = router;
