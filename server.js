var express = require('express');
var app = express();
var util = require('./lib/util');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.listen(8000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/client/index.html');
});

app.post('/submit', util.addIndicator);

app.get('/submit',util.fetchIndicators)

app.get('/*', function (req, res) {
  console.log('Req: ', req.method, 'URL: ', req.url);
  res.redirect('/');
});

console.log('Live on port 8000');