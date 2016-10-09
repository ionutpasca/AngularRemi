(function(angular) {
    'use strict';
    angular.module('remiApp')
    .service('mainService', ['$http','serverUrl', function($http, serverUrl) {

        this.getUserDetails = function() {
            return new Promise((resolve, reject) => {
                $http.get(serverUrl + '/userDetails')
                .success((data) => {
                    resolve(data);
                })
                .error((error) => {
                    reject(error);
                });
            });
        };

    }]);
})(this.angular);