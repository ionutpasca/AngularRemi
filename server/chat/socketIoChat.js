var http = require('http');
var io = require('socket.io');
var _ = require('lodash');

var User = require('../models/user');
var ChatMessage = require('../models/ChatMessage');

module.exports = function(app){
  var httpServer = http.Server(app);
  var socketIO = io(httpServer);
  var clients = [];

  function getDbMessages(){
    return new Promise((resolve, reject) => {
        ChatMessage.find()
            .sort({_id: -1})
            .limit(25)
            .exec((err, messages) => {
            if(err){
                reject(err);
            }
            resolve(messages);
        });
    })
  }

  function saveNewMessage(message){
      var newMessage = new ChatMessage();
      newMessage.message.username = message.username;
      newMessage.message.body = message.body;
      newMessage.message.userAvatar = message.userAvatar;
      newMessage.message.date = new Date();

      return new Promise((resolve, reject) => {
        newMessage.save((err, newMessage) => {
            if(err){
                reject(err);
            }
            resolve(newMessage._id);
        });
      });
  }

  socketIO.on('connection', (socket) => {
      console.log('User connected with ID: '+socket.id);
      clients.push(socket.id);
      getDbMessages().then((messages) => {
        socketIO.emit('initial-messages', messages );
      });

      socket.on('new-message', (msg) => {
          saveNewMessage(msg).then((newMessageId) => {
              msg.id = newMessageId.id;
              socketIO.emit('receive-message', msg);
          });
      });

      socket.on('disconnect', () => {
          _.remove(clients, function(client){
              return client === socket.id;
          });
      });
  });

  httpServer.listen('3001', () => {
      console.log('chat is on');
  });
};