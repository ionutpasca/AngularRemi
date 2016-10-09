(function(angular) {
  'use strict';
  angular.module('gameModule', ['ngAnimate', 'ngCookies', 'ngRoute',
      'ngSanitize', 'btford.socket-io', 'ngMessages', 'ngMaterial', 'ui.bootstrap'])
    .constant('serverUrl', 'http://localhost:3000')
    
    .config(function ($routeProvider) {
      $routeProvider
        .when('/etalat', {
          templateUrl: 'scripts/game/remiEtalat/remiEtalat.html',
          controller: 'remiEtalatController as ctrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }]);
})(this.angular);