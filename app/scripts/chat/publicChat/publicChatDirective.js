(function(angular) {
    'use strict';
    angular.module('remiApp')
    .directive('publicChat', [function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/chat/publicChat/publicChat.html',
            controller: 'publicChatController'
        }
    }]);
})(this.angular);