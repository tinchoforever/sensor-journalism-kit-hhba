var express = require('express'),
    configuration = require('../config');
  
module.exports.init = function (app) {

  // Routes
  var Routes = {
    api: {}
  };

  
  Routes.home = require('./app/home');
  app.get('/', Routes.home);
  // API Prefix
  
};