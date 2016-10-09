(function(angular) {
    'use strict';
    angular.module('remiApp')
    .controller('headerController', ['$timeout', '$scope', '$cookies', 
    function($timeout, $scope, $cookies) {
        $scope.user = {};

        $timeout(function() {
            $scope.user.username = $cookies.get('username');
            $scope.user.userAvatar = $cookies.get('userPicture');
        }, 100);

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
    }]);
})(this.angular);