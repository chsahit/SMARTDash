var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// Models
var User = require('../models/user');

router.get('/', function(req, res) {
    if (req.session.user) {
        res.json({
            user: req.session.user,
            success: 1
        })
    } else {
        res.json({
            success: 0,
            message: "User not logged in"
        })
    }
});

router.route('/register').post(function(req, res) {
    if (req.body.username && req.body.password) {
        var hash = bcrypt.hashSync(req.body.password, salt);

        var user = new User({
            username: req.body.username,
            password: hash,
        });
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.json({
                    success: 0
                });
            } else {
                res.json({
                    success: 1
                });
            }
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
