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
  // var ApiPrefix = '/api/v1/';
  // Routes.homeAPI = require('./api/home');
  // app.get(ApiPrefix, Routes.homeAPI);
  
};