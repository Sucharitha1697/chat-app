var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var connections = [];
var username =[];
var store;







io.sockets.on('connection', function(socket){
	connections.push(socket);
  console.log("Connected: %s sockets connected",connections.length);
  


  socket.on('send message', function(data){
    
    io.sockets.emit('new message',{ msg : data ,userrt : socket.id});
});


  socket.on('user message',function(data,callback){
  	callback(true);
  	socket.id = data;
  	username.push(socket.id);
  	
  	
  	
  	updateName();

  	
   
});

  function updateName(){
  	 io.sockets.emit('user list',username);
  }

  

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

