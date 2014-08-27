var request = require('request'),
    messure = require('../../models/messure'),
    config = require('../../config');

var home = function (req, res) {
  var viewData = {
    title: 'mediciones',
    section: 'home'
  };
  
  messure.findOne({}).sort('-created').exec( function(err, doc) {
     res.send(doc, 200);
  });
    
};

module.exports = home;