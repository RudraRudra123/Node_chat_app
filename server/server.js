//use path joins path segments together using the platform specific seperator
//as a delimiter, then normalizes the resulting path
//native libs
const path = require('path');
const http = require('http');  
//downloads
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public/'); 
const port = process.env.PORT||3000; 
let app = express();
let server= http.createServer(app); //express app can be used as receiving function
let io = socketIO(server);

//call express static middleware
app.use(express.static(publicPath)); 
//console.log(publicPath);

//Listen to requests
io.on('connection', (socket) => {
    console.log('New user connected!');

    //socket.emit from Admin text welcome to the chat app
    //socket.broadcast.emit  

    //Listen to port and create new message then send it back to browser
    socket.on('createMessage', (message) => {
        console.log('createMesage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    }); 

    //socket.emit from Admin text Welcome to the chat group
    //socket.broadcast.emit from Admin text New user joined

      
        socket.emit('welcomeUser', {
            from: 'Admin',
            text: 'Welcome to the chatroom, you have logged in at'+ new Date().getTime(),
            loggedInAt: new Date().getTime()
        }); 
        socket.broadcast.emit('welcomeUser',{
            from: 'Admin',
            text: 'New user logged in'
        }); 
 
    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
 }); 

//You are listening to server(http), not app
server.listen(port, () => {
    console.log(`Chat app running on port ${port}`);
});