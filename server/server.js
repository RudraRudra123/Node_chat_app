//use path joins path segments together using the platform specific seperator
//as a delimiter, then normalizes the resulting path
//native libs
const path = require('path');
const http = require('http');  
//downloads
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./users');

const publicPath = path.join(__dirname, '/../public/'); 
const port = process.env.PORT||3000; 
let app = express();
let server= http.createServer(app); //express app can be used as receiving function
let io = socketIO(server);
let users = new Users();
//call express static middleware
app.use(express.static(publicPath)); 
//console.log(publicPath);

//Listen to requests
io.on('connection', (socket) => {
    console.log('New user connected!');

    //socket.emit from Admin text welcome to the chat app
    //socket.broadcast.emit  
    socket.on('join', (params, callback) =>{
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }
        socket.join(params.room); //join into a room
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app, you have logged in at' + new Date().getTime()));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `New user ${params.name} logged in`)); 
        callback();
    });
    //Listen to port and create new message then send it back to browser
    socket.on('createMessage', (message, callback) => {
        console.log('createMesage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    }); 

    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', 
        coords.latitude, coords.longitude));
        
    });
    //socket.emit from Admin text Welcome to the chat group
    //socket.broadcast.emit from Admin text New user joined
    
    socket.on('disconnect', () => {
        //If a user exits:
        //    1. remove the user from the list connected to a room
        //    2. Send the updated list to the client (emit an event)
        //    3. Broadcast a message to users in the room that a user has disconnected
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
 }); 

//You are listening to server(http), not app
server.listen(port, () => {
    console.log(`Chat app running on port ${port}`);
});