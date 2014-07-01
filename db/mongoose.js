var mongoose = require('mongoose');

var ip = 'mongodb://phrequency:YBUwcj_pcp7gTJRXBV1VBbRk8LLbnbXU6h4VA2Cw1xw-@ds050077.mongolab.com:50077/phrequency';

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