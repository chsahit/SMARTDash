var access = require('../access');
var express = require('express');
var router = express.Router();
var request = require('request');

// Models
var User = require('../models/user');
var Goal = require('../models/goal');

router.get('/progress', access.requireLogin, function(req, res) {
    if(req.session.user) {
        request.get({url:'http://api.reimaginebanking.com/accounts/' + req.session.accountid + 'deposits?key=2166680e61b8f43aaebf22492d3fbf65' }, function optionalCallback(err, httpResponse, body)  {
            if (err) {
                console.error('get failed: ', err);
                res.json({
                    'success': 1
                });
            } else {
                console.log('success. ', httpResponse);
                res.json({
                    'success': 0
                });
            }
        });
    }
});
module.exports = router;
