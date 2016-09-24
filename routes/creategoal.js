var express = require('express');
var router = express.Router();

// Models
var Goal = require('../models/goal');

router.route('/creategoal').post(function(req, res) {
    if (req.body.amt && req.body.EndDate) {
        var goal = new Goal({
            amt: req.body.amt,
            EndDate: req.body.EndDate,
        });
        goal.save(function(err) {
            if (err) {
                console.log(err);
                res.json({
                    success: 0,
                    message: "failed save" 
                });
            } else {
                res.json({
                    success: 1
                });
            }
        });
    } else {
        res.json({
            success: 0,
            message: "lacks fields"
        });
    }
});

module.exports = router
