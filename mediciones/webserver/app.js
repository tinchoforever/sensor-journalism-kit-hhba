  /**
   * Module dependencies.
   */

  var express = require('express'),
      router = require('./routes'),
      http = require('http'),
      mongo = require('./models/mongo-core'),
      path = require('path'),
      messure = require('./models/messure');

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
  
  var io = require('socket.io').listen(server);
  if (process.env.NODE_ENV ==='production'){
    //For Heroku
    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
        io.set("log level", 1);
    });
  }

  var mainSocket = {};
  io.sockets.on('connection', function(socket) {
    mainSocket = socket;

    socket.on('movie-item', function(msg) {
         console.log("movie-item", msg);
         socket.broadcast.emit("new-item", msg);
    });
  });


  var SerialPort = require("serialport").SerialPort
  var serialPort = new SerialPort("/dev/cu.usbmodemfa141", {
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