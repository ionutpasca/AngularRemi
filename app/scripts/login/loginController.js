(function(angular) {
    'use strict';

    angular.module('remiApp')
    .controller('loginController', ['$scope', '$window','$cookies', 'serverUrl', 
    function($scope, $window, $cookies, serverUrl){
        
        $scope.loginWithFacebook = function() {
            $window.location = serverUrl + '/auth/facebook';
        };
    }]);
})(this.angular);