var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var messureSchema = Schema({
  value: Number,
  created: { type: Date, default: Date.now }
}, {
  collection: 'messures'
});

module.exports = mongoose.model('Messure', messureSchema);
