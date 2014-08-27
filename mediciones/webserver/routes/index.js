var express = require('express'),
    configuration = require('../config');
  
module.exports.init = function (app) {

  // Routes
  var Routes = {
    api: {}
  };

  // API Prefix
  var ApiPrefix = '/api/v1/';
  
  Routes.home = require('./app/home');
  Routes.homeAPI = require('./api/home');
  app.get('/', Routes.home);
  app.get(ApiPrefix, Routes.homeAPI);
  //set authentication routes
};