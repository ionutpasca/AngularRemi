(function(angular) {
    'use strict';
    angular.module('remiApp')
    .directive('mainHeader', [function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/header/header.html',
            controller: 'headerController as ctrl'
        };
    }]);
})(this.angular);