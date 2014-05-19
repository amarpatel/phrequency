var mongoose = require('../db/mongoose');
var Indicator = mongoose.Indicator;
var mpUtils = require('mongoose-bluebird-utils'); 

exports.addIndicator = function (req,res) {
  var userIndicatorObj = '';
  req.on('data', function (chunk) {
    userIndicatorObj += chunk;
  });
  req.on('end', function () {
    userIndicatorObj = JSON.parse(userIndicatorObj);
    mpUtils.findOneP( Indicator, {name: userIndicatorObj.name}).then(function (found){
      if (found) {
        //throw error
        res.send(404, 'Indicator Already Exists!');
      } else {
        userIndicatorObj.frequency = userIndicatorObj.frequency * 1000;
        //creates new mongoose obj
        var IndicatorObj = new Indicator(userIndicatorObj);
        //saves mongoose obj in db
        mpUtils.saveP(IndicatorObj).then(function (newLink) {
          res.send(200, newLink);
        });
      }
    })
  });
};

exports.fetchIndicators = function (req, res) {
  mpUtils.findP(Indicator).then(function (indicators){
    res.send(200, indicators);
  });
};