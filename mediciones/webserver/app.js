  /**
   * Module dependencies.
   */

  var express = require('express'),
      router = require('./routes'),
      http = require('http'),
//      mongo = require('./models/mongo-core'),
      path = require('path');
      // messure = require('./models/messure');

  var app = express();
  
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  router.init(app);
  var server =http.createServer(app);
  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  //API 
   var ApiPrefix = '/api/v1/';
   var lastMeasure = {
    value: 0,
    created: Date.now() 
   };
   var homeAPI =  function (req, res) {

       res.send(lastMeasure, 200);
   };
   app.get(ApiPrefix, homeAPI);
  
  
// NodeJS includes
var sys = require('sys');
var fs = require('fs');
var id = '';

fs.createReadStream('/dev/cu.usbmodemfa141', { bufferSize: 1 })

.on('open', function(fd) {
  sys.puts('Begin scanning');
})

.on('end', function() {
  sys.puts('End of data stream.');
})

.on('close', function() {
  sys.puts('Closing stream.');
})

.on('error', function(error) {
  sys.debug(error);
})

.on('data', function(chunk) {
  chunk = chunk.toString('ascii').match(/\w*/)[0]; // Only keep hex chars
  if ( chunk.length == 0 ) { // Found non-hex char
    if ( id.length > 0 ) { 
      //Que valor vas a medir? Controlalo y despues guardalo :-o
          var messureValue =  parseFloat(id);
          if (messureValue) {
            // if (messureValue < 100) {
            //   messureValue *= 10;
            // }
            lastMeasure = {
              value: messureValue,
              created: Date.now() 
            };
          } else {
            console.log(messureValue);
          }
      sys.puts(id);
    }
    id = ''; // Prepare for the next ID read
    return;
  }
  id += chunk; // Concat hex chars to the forming ID
});
    
    
  process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close(function () {
      // Disconnect from cluster master
      process.disconnect && process.disconnect();
    });
});