(function(angular) {
    'use strict';
    angular.module('remiApp')
    .factory('publicChatSocket', function(socketFactory) {
        return socketFactory({
            ioSocket: io.connect('http://localhost:3001')
        });
    });
})(this.angular);