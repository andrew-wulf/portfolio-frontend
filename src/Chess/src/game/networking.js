// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// /////////////Tell Socket.io to accept connections
// io.on('connection', function(socket){
//   //A new user has connected!
//   console.log("Hello user!")//This will output on the server side

//   //If the server gets a 'new-click' message, tell everyone who's connected!
//   socket.on('new-click', function(msg){
//     io.emit('new-click', msg);
//   });
// });




// ///////////////Start the server and such
// app.get('/', function(req, res){
//   res.sendFile('../main.jsx');
// });


// //If you're running locally, you can now open localhost:8080 in a web browser and see it running!
// http.listen(8080, function(){
//   console.log('listening on *:8080');
// });