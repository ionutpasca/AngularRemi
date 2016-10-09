var http = require('http');
var io = require('socket.io');
var CardsDivider = require('./CardsDivider.js');
var _ = require('lodash');

module.exports = function(app) {
    var httpServer = http.Server(app);
    var socketIO = io(httpServer);
    var rooms = [];

    function getCardsForUser(roomName){
        var cards = rooms[roomName].cards;
        var cardsForUser = cards.slice(0, 2);
        cardsForUser = cardsForUser[0].cards.concat(cardsForUser[1].cards);
        cards = cards.slice(2, cards.length);
        return cardsForUser;
    }

    function roomContainsUser(socketId, roomName){
        if(!rooms[roomName]){
            return false;
        }
        return _.some(rooms[roomName].clients, (client) => {
            client.socketId === socketId;
        });
    }

    function addPlayerToRoom(socketId, player, roomName){
        if(roomContainsUser(socketId, roomName)){
            return;
        }
        var client = {
            socketId: socketId,
            user: player
        };
        if(rooms[roomName].clients){
            rooms[roomName].clients.push(client);
        }
        else{
            rooms[roomName].clients = [client];
        }
    } 

    socketIO.on('connection', (socket) => {
        console.log('User connected with ID: '+socket.id);
        
        socket.on('createRoom', (request) => {
            var room = request.roomName;
            rooms.push(room);
            var dividedCards = CardsDivider.getCardsBatches();
            rooms[room] = {};
            rooms[room].cards = dividedCards.cards;
            rooms[room].atuu = dividedCards.Atuu;
        });

        socket.on('getRoomData', (request) => {
            var roomName = request.roomName;
            var clientsInRoom = socketIO.sockets.adapter.rooms[roomName];
            if(clientsInRoom && clientsInRoom.length >= 4){
                socketIO.to(socket.id).emit('error','Too many clients');
                return;
            }
            socket.join(roomName);
            addPlayerToRoom(socket.id, request.user, roomName);
            rooms[roomName].clients.push()
            // clientsInRoom = clientsInRoom ? clientsInRoom.length : 1;

            var cardsForUser = getCardsForUser(roomName);
            socketIO.in(roomName).emit('playerConnected', clientsInRoom);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });

    httpServer.listen('3002', () => {
      console.log('game sockets are on');
  });
};