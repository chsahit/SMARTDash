var express = require('express');
var request = require('request');

var Goal = require('../models/goal');

router.get('/saving', function(req, res) {
    console.log(Goal.find(username: req.body.username))
});

