(function(angular) {
    'use strict';
    angular.module('remiApp')
    .directive('footer', [function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/footer/footer.html',
            controller: 'footerController as ctr'
        };
    }]);
})(this.angular);