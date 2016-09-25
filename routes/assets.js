var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
        var url = 'http://api.reimaginebanking.com/customers/' + req.session.user.customerid + '/accounts?key=2166680e61b8f43aaebf22492d3fbf65';
        request.get(url, function(err, httpResp, body){
        res.json({
            success: 1,
            data: body
        })
    });
});
module.exports = router;
