(function(angular) {
    'use strict';
    angular.module('remiApp')
    .controller('gameTypesController', ['$scope', '$location', function($scope, $location) {
        
        $scope.goToRemiEtalat = function() {
            $location.path('/etalat');
        }
    }]);
})(this.angular);