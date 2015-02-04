'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('liveController', function($scope, $http, $routeParams, $location, $route, $interval) {
    
    $scope.liveVolume = [];
    $interval(function(){
      $http.get('live').
        success(function(data, status, headers, config) {
          $scope.liveVolume = data;
          if (data.length > 0 ){
            $scope.first = data[0];
            if (data.length > 1){
              $scope.last = data[data.length -1];
            }
          }

        }).
        error(function(data, status, headers, config) {
          
        });
    },1500);
 });
  	