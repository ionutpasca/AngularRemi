(function(angular, _, moment) {
    'use strict';
    angular.module('remiApp')
    .controller('publicChatController', ['$cookies', '$scope', 'publicChatSocket', 
    function($cookies, $scope, chatSocket) {
        $scope.messages = [];

        function dateIsToday(inputDate) {
            inputDate = new Date(inputDate).setHours(0, 0, 0, 0);
            var today = new Date().setHours(0, 0, 0, 0);
            if(inputDate === today) {
                return true;
            }
            return false;
        }

        $scope.sendMessage = function() {
            var messageBody = angular.element.find('#message-input')[0].value;
            var msg = {
                body: messageBody,
                username: $cookies.get('username'),
                userAvatar: $cookies.get('userPicture'),
                date: new Date()
            };
            chatSocket.emit('new-message', msg);
            angular.element.find('#message-input')[0].value = '';
        }

        $scope.senderIsCurrentUser = function(msgSender) {
            return msgSender === $cookies.get('username');
        }

        chatSocket.on('receive-message', (msg) => {
            var msgDate = msg.date;
            if(dateIsToday(msgDate)){
                msg.date = moment(msgDate).format('LT');
            } else {
                msg.date = moment(msgDate).format("MMM Do YY");
            }
            $scope.messages.push(msg);
        });

        chatSocket.on('initial-messages', (msgs) => {
            _.each(msgs, (msg) => {
                var msgDate = msg.message.date;
                if(dateIsToday(msgDate)){
                    msg.message.date = moment(msgDate).format('LT');
                } else {
                    msg.message.date = moment(msgDate).format("MMM Do YY");
                }
                $scope.messages.unshift(msg.message);
            });
        });
    }]);
})(this.angular, this._, this.moment);