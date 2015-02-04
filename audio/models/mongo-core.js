var mongoose = require('mongoose'),
    config = require('../config');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.MONGO_URI;

mongoose.connect(uristring);


console.log('active db', uristring);

exports.mongoose = mongoose;