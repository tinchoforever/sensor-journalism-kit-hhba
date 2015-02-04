'use strict';

angular.module('ssApp.controllers', []);

// Declare app level module which depends on filters, and services
angular.module('ssApp', [
  'ngRoute',
  'ssApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', 
    {
      templateUrl: '/app/partials/home.html', 
      controller: 'homeController'
    });
    $routeProvider.when('/capture/:city', 
    {
      templateUrl: '/app/partials/capture.html', 
      controller: 'captureController'
    });
    $routeProvider.when('/live', 
    {
      templateUrl: '/app/partials/live.html', 
      controller: 'liveController'
    });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
