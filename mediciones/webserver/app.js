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
  


  var SerialPort = require("serialport").SerialPort;
  //Reemplazalo con el tuyo :)
  var port = "/dev/cu.usbmodemfa141";
  var serialPort = new SerialPort(port, {
      baudrate: 9600
  });
  serialPort.on("open", function() {
      console.log('Arudino online!');
      serialPort.on('data', function(data) {
          

          var messureValue =  parseFloat(data);
          if (messureValue) {
            if (messureValue < 100) {
              messureValue *= 10;
            }
            var obj = {};
            obj.value = messureValue;
            var messureModel = new messure(obj);
            messureModel.save();
          } else {
            console.log(messureValue);
          }
          

      });
  });
    
    
    
  process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close(function () {
      // Disconnect from cluster master
      process.disconnect && process.disconnect();
    });
});