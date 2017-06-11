var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Customer = new Schema({
  bringgId: String,
  name: String,
  phone: String,
  orders: [{
    name: String,
    phone: String,
    address: String,
    message: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Customer', Customer);
