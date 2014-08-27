var mongoose = require('mongoose'),
    cache = require('mongoose-cache'),
    config = require('../config');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.MONGO_URI;

mongoose.connect(uristring);

var cacheOpts = {
  max: 50,
  maxAge: 1000 * 60 * 2
};

console.log('active db', uristring);
cache.install(mongoose, cacheOpts);

exports.mongoose = mongoose;