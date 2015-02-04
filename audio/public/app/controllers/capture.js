'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('captureController', function($scope, $routeParams, $location,$interval, $route) {
  	$scope.city = $routeParams.city;
    var serverName = $location.protocol() + "://" + $location.host() + ":" + $location.port();
  	var socket = io(serverName);
    var citymap = {};
    citymap['nyc'] = 'New York';
    citymap['atx'] = 'Austin';
    citymap['la'] = 'Los Angeles';
    citymap['ba'] = 'Buenos Aires';
    citymap['lnd'] = 'London';
    citymap['snd'] = 'Sydney';
    citymap['sp'] = 'São Paulo';
    citymap['stk'] = 'Stockholm';
  	citymap['bc'] = 'Bucarest';


  	$interval(function(){
      if (window.volume) {
              socket.emit('some-noise', 
              { 
                city: citymap[$routeParams.city],
                cityid: $routeParams.city,
                volume: window.volume.toFixed(3) * 100,
              });
      }
  	},1000);

	navigator.getUserMedia = (navigator.getUserMedia ||
	                          navigator.webkitGetUserMedia ||
	                          navigator.mozGetUserMedia ||
	                          navigator.msGetUserMedia);

	 	
	var onStream =function(stream) {
		// Create an AudioNode from the stream.
		var audioContext = new AudioContext();
    	var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    	// Create a new volume meter and connect it.
		createAudioMeter(audioContext);
		mediaStreamSource.connect($scope.processor);

    // kick off the visual updating

	};

	var onStreamError = function(e) {
	  console.error('Error getting microphone', e);
	};

	navigator.getUserMedia({audio: true, video:false}, 
	onStream, function (e){
		console.log('there was an error',e)
	});

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
	var createAudioMeter = function(audioContext){
		var processor = audioContext.createScriptProcessor(512);
		processor.onaudioprocess = volumeAudioProcess;
		processor.clipping = false;
		processor.lastClip = 0;
		processor.volume = 0;
		processor.clipLevel = 0.98;
		processor.averaging = 0.95;
		processor.clipLag = 750;

		// this will have no effect, since we don't copy the input to the output,
		// but works around a current Chrome bug.
		processor.connect(audioContext.destination);

		$scope.processor = processor;

	}

	function volumeAudioProcess( event ) {
		var buf = event.inputBuffer.getChannelData(0);
	    var bufLength = buf.length;
		var sum = 0;
	    var x;

		// Do a root-mean-square on the samples: sum up the squares...
	    for (var i=0; i<bufLength; i++) {
	    	x = buf[i];
	    	if (Math.abs(x)>=this.clipLevel) {
	    		$scope.processor.clipping = true;
	    		$scope.processor.lastClip = window.performance.now();
	    	}
	    	sum += x * x;
	    }

	    // ... then take the square root of the sum.
	    var rms =  Math.sqrt(sum / bufLength);

	    // Now smooth this out with the averaging factor applied
	    // to the previous sample - take the max here because we
	    // want "fast attack, slow release."
	    $scope.processor.volume = Math.max(rms, $scope.processor.volume*$scope.processor.averaging);
	    window.volume = $scope.processor.volume;
	}

});
  	