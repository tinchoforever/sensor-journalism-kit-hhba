var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var messureSchema = Schema({
  volume: Number,
  cityid: String, 
  created: { type: Date, default: Date.now },
  city: String
}, {
  collection: 'messures'
});

module.exports = mongoose.model('Messure', messureSchema);
