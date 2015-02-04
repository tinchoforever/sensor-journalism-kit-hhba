var express = require('express'),
    messure = require('../models/messure'),
    configuration = require('../config');
  
module.exports.init = function (app) {

  // Routes
  var Routes = {
    api: {}
  };

  
  Routes.home = require('./app/home');
  app.get('/', Routes.home);
  app.get('/d3', function(req, res) {
    res.render('live2');
  });
  app.get('/live', function(req, res) {
    messure.aggregate().sort('created').group({ _id: {city:"$city", cityid: "$cityid"} , averageVolume: { $last: "$volume" }}).sort('-averageVolume').exec( function(err, doc) {
     res.send(doc, 200);
    });
  });
  app.get('/live2', function(req, res) {
    messure.aggregate().group({ _id: {city:"$city", cityid: "$cityid"} , averageVolume: { $last: "$volume" } }).exec( function(err, doc) {
     var total = 0;
     for (var i = doc.length - 1; i >= 0; i--) {
        total = doc[i].averageVolume;
        console.log(doc.length);
      };
     var average = {};
     average.data = (total/doc.length);
     res.send(average, 200);
    });
  });
  // API Prefix
  
};