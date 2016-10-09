(function(angular) {
    'use strict';
    angular.module('remiApp')
    .directive('gameTypes', [function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/mainPage/gameTypes/gameTypes.html',
            controller: 'gameTypesController as ctrl'
        };
    }]);
})(this.angular);