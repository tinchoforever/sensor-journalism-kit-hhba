'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('homeController', function($scope, $routeParams, $location, $route) {
    $scope.cities = [
        {'class': 'ny', 'name': 'New York', 'endpoint' :'nyc'},
        {'class': 'au', 'name': 'Austin', 'endpoint' :'atx' },
        {'class': 'la', 'name': 'Los Angeles', 'endpoint' :'la'},
        {'class': 'ba', 'name': 'Buenos Aires', 'endpoint' :'ba'},
        {'class': 'ln', 'name': 'London', 'endpoint' :'lnd'},
        {'class': 'sy', 'name': 'Sydney', 'endpoint' :'syd'},
        {'class': 'sp', 'name': 'São Paulo', 'endpoint' :'sp'},
        {'class': 'sk', 'name': 'Stockholm', 'endpoint' :'stx'},
        {'class': 'bc', 'name': 'Bucarest', 'endpoint' :'bc'},
      ];
 });
