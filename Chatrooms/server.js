var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    DB = require('./db_query'),

    users = [];
//specify the html we will use

app.use('/', express.static(__dirname + '/www'));


//bind the server to the 80 port
//server.listen(3000);//for local test

server.listen(process.env.PORT || 3000);
var rooms = [];
var count = 0;

app.get('/:room',function(req,res){
    console.log('room name is :'+req.params.room);
    res.render('Chat',{room:req.params.room});
});

io.sockets.on('connection', function(socket) {
   
    socket.on('joinroom',function(data){

        socket.join(data.room);
        socket.set('room', data.room,function() {
            var room = data.room;

            var nickname = 'FBI' +count;

            socket.set('nickname',nickname,function(){
                // Create Room
                if (rooms[room] == undefined) {
                    console.log('room create :' + room);
                    rooms[room] = new Object();
                    rooms[room].socket_ids = new Object();
                }

                // Store current user's nickname and socket.id to MAP

                rooms[room].socket_ids[nickname] = socket.id

                // broad cast join message
                data = {msg: nickname + ' 님이 입장하셨습니다.'};
                io.sockets.in(room).emit('broadcast_msg', data);
                // broadcast changed user list in the room
                io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
                count++;
                
                DB.count_up(room);         
            });

        });
    });

 //user leaves
    socket.on('disconnect', function() {
    if (socket.nickname != null) {
        //users.splice(socket.userIndex, 1);
        users.splice(users.indexOf(socket.nickname), 1);
        socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
    }
    });

    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
   
});
