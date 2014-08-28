var request = require('request');

var home = function (req, res) {
  var viewData = {
    title: 'mediciones',
    section: 'home'
  };
  res.render('index', viewData);
  
};

module.exports = home;