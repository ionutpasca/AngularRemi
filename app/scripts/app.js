(function(angular) {
  'use strict';
  angular.module('remiApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute',
      'ngSanitize', 'btford.socket-io', 'ngMessages', 'ngMaterial', 'ui.bootstrap',
      'luegg.directives', 'gameModule'])

    .constant('serverUrl', 'http://localhost:3000')
    
    .config(function ($routeProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: 'scripts/login/login.html',
          controller: 'loginController'
        })
        .when('/', {
          templateUrl: 'scripts/mainPage/main.html',
          controller: 'mainController'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }])
    .config(function($mdIconProvider) {
      $mdIconProvider
        .iconSet("call", 'images/facebook.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
    });

    angular.module('remiApp')
    .factory('Auth',['$cookies', 'mainService', function($cookies, mainService) {
      return {
          setUser : function() {
             mainService.getUserDetails()
             .then((userData) => {
                if(!userData.email) {
                  return;
                }
                $cookies.put('userEmail', userData.email);
                $cookies.put('username', userData.name);
                $cookies.put('userPicture', userData.profilePicture);
            });
          },
          isLoggedIn : function() {
              return $cookies.get('username');
          }
        };
    }]);

    angular.module('remiApp')
    .run(['$rootScope', '$location', 'Auth', '$cookies', function ($rootScope, $location, Auth, $cookies) {
      var userDataMustBeSaved;
      $rootScope.$on('$routeChangeStart', function (event) {
        
        if($location.path() !== '/login' && !$cookies.get('username')) {
          Auth.setUser();
        }
        if (!Auth.isLoggedIn()) {
            $location.path('/login');
        }
    });
}]);
})(this.angular);