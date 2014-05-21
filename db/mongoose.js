var mongoose = require('mongoose');

var ip = 'mongodb://localhost/phrequency';

mongoose.connect(ip);

var Schema = mongoose.Schema;

// Delcare schemas

var indicatorSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  frequency:   Number,
  class: {
    type: String,
    default: 'happening'
  },
  background: {
    type: String,
    default: 'lightgrey'
  },
  font: {
    type: String,
    default: 'black'
  },
  date: { type: Date, default: Date.now }
}, {id: true});

exports.Indicator = mongoose.model('Indicator', indicatorSchema);