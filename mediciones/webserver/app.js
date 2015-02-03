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
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
  }



  router.init(app);
  var server =http.createServer(app);
  app.get('/temperatura', function(req, res){
	  res.render('temperatura');
  });
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
  
  


  var SerialPort = require("serialport").SerialPort;
  //Reemplazalo con el tuyo :)
  var port = "/dev/cu.usbmodemfd1431";
  var serialPort = new SerialPort(port, {
      baudrate: 9600
  });
  var receivedData = '';
  serialPort.on("open", function() {
      console.log('Arudino online!');
      serialPort.on('data', function(data) {
          

          receivedData += data.toString();
          console.log(receivedData);
          if (receivedData.indexOf('E') >= 0 && receivedData.indexOf('B') >= 0) {
           // save the data between 'B' and 'E'
             sendData = receivedData.substring(receivedData.indexOf('B') + 1, receivedData .indexOf('E'));
             receivedData = '';
             console.log('sending', sendData);
               lastMeasure = {
                value: sendData,
                created: Date.now() 
              };
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
