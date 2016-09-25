var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var request = require('request');

// Models
var User = require('../models/user');
var access = require('../access');

router.get('/', function(req, res) {
    if (req.session.user) {
        res.json({
            user: req.session.user,
			customerid: req.session.customerid,
			accountid: req.session.accountid,
            success: 1
        })
    } else {
        res.json({
            success: 0,
            message: "User not logged in"
        })
    }
});
router.get('/logout', function(req, res) {
    req.session.destroy(function(err){
        res.json({
            success: 1
        });
    });
});
router.route('/register').post(function(req, res) {
    if (req.body.username && req.body.password && req.body.firstname && req.body.lastname) {
        var hash = bcrypt.hashSync(req.body.password, salt);
		request.post({url:'http://api.reimaginebanking.com/customers?key=2166680e61b8f43aaebf22492d3fbf65', json: {first_name:req.body.firstname,last_name:req.body.lastname,address:{street_number:"1",street_name:"North Ave NW",city:"Atlanta",state:"GA",zip:"30332"}}}, function optionalCallback(err, httpResponse, custbody) {
		  if (err) {
			  return console.error('upload failed:', err);
		  }
		  request.post({url : `http://api.reimaginebanking.com/customers/${custbody.objectCreated._id}/accounts?key=2166680e61b8f43aaebf22492d3fbf65`, json: {type: "Checking", nickname: "Checking", rewards: 0, balance: 0, account_number:"0000000000000001"}}, function optionalCallback(err, httpResponse, body) {
			  console.log(body);
			  var user = new User({
	              username: req.body.username,
	              password: hash,
	  			  firstname: req.body.firstname,
	  			  lastname: req.body.lastname,
				  customerid: custbody.objectCreated._id,
				  accountid: body.objectCreated._id
	          });
			  user.save(function(err) {
	              if (err) {
	                  console.log(err);
	              } else {
					  res.json({
  	  				  	success: 1
  	  			  	  });
	              }
	          });
			  
		  });
		});
        
    } else {
        res.json({
            success: 0
        });
    }
});

router.route('/login').post(function(req, res) {
    if (req.body.username && req.body.password) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.regenerate(function() {
                        req.session.user = {
                            username: user.username,
							customerid: user.customerid,
							accountid: user.accountid,
                            _id: user._id,
                        };
						res.json({
							success: 1,
						});
                    });
                } else {
                    res.json({
                        success: 0,
                        message: "Username or password incorrect"
                    });
                }
            } else {
                res.json({
                    success: 0,
                    message: "Username or password incorrect"
                });
            }

        });
    } else {
        res.json({
            success: 0,
            message: "Username or password not supplied"
        });
    }
});
module.exports = router;
