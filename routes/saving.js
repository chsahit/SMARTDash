var express = require('express');
var router = express.Router();

// Models
var Goal = require('../models/goal');

router.route('/').get(function(req, res) {
    var x = Goal.find({}, function (err, cb) {
			res.json({
				success: 1,
				data: cb
			});
		});
});


module.exports = router
