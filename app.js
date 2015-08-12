var express = require('express');
var app = express();

var port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('<html><head><meta name="google-site-verification" content="AbntZigDG-zAMsB3C8oojbXtSl9XJQvA800wIrarN6g" /></head><body>vysor.io</body></html>');
});


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});