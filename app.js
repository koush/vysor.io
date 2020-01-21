var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/share', express.static(path.join(__dirname, 'public/share')));
app.use('/share', express.static(path.join(__dirname, 'public')));
app.use('/purchase/+', express.static(path.join(__dirname, 'public/purchase')));
app.use('/purchase', express.static(path.join(__dirname, 'public')));
app.use('/purchase-complete/+', express.static(path.join(__dirname, 'public/purchase')));
app.use('/purchase-complete', express.static(path.join(__dirname, 'public')));
app.use('/redirect/+', express.static(path.join(__dirname, 'public/view')));
app.use('/redirect', express.static(path.join(__dirname, 'public')));
app.use('/view/+', express.static(path.join(__dirname, 'public/view')));
app.use('/view', express.static(path.join(__dirname, 'public')));
app.use('/server/+', express.static(path.join(__dirname, 'public/server')));
app.use('/server', express.static(path.join(__dirname, 'public')));
app.use('/redirects/+', express.static(path.join(__dirname, 'public/server')));
app.use('/redirects', express.static(path.join(__dirname, 'public')));
app.use('/app/vysor', express.static(path.join(__dirname, 'public/app/screen.html')));
app.use('/app/browser', express.static(path.join(__dirname, 'public/app/screen.html')));


app.post('/gist', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  request.post({
    body: req.body,
    url: 'https://api.github.com/gists',
    headers: {
      'User-Agent': 'Vysor node.js server',
      'Authorization': 'token ' + process.env['GITHUB_TOKEN']
    }
  }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
      }
      res.send(body)
  });
})


app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/manual', function(req, res) {
  res.redirect('https://github.com/koush/vysor.io/wiki');
})

//
// app.get('/', function(req, res) {
//   res.send('vysor.io');
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
