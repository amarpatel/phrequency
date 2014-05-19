// var Promise = require('bluebird');
var mongoose = require('mongoose');

var ip = 'mongodb://localhost/frequency';

mongoose.connect(ip);

var Schema = mongoose.Schema;

// Delcare schemas

var indicatorSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  frequency:   Number
}, {id: true});

// Declare methods







// indicatorSchema.methods.hashPassword = function () {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.password, null, null).bind(this);
// };

// indicatorSchema.methods.comparePassword = function (attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
//     callback(isMatch);
//   });
// };

// Set event listeners
// links.pre("validate", function (next) {
//   var shasum = crypto.createHash('sha1')
//   shasum.update(this.url);
//   this.code = shasum.digest('hex').slice(0, 5);
//   next();
// });

// indicatorSchema.pre('validate', function (next) {
//   var self = this;
//   this.hashPassword().then(function(hash){
//     self.password = hash;
//     next();
//   });
// });

// Instantiate models
// exports.Link = mongoose.model('Link', links);
exports.Indicator = mongoose.model('Indicator', indicatorSchema);