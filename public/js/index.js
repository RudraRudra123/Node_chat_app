let socket = io(); 
//const { generateMessage } = require('/../server/**/message.js');
socket.on('connect', function () {
    console.log('Connected to server');

/*     socket.emit('createMessage', {
       from: 'rakesh@gmail.com',
       text: 'this is sample text' 
    }) */
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('newMessage from server', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

//socket.emit('createMessage', generateMessage('fromClient','Message from index.js'));
$(document).ready(function () {
    let form = $('#message-form');
    form.submit(function (event){
        // Prevent the form from submitting via the browser.
        //avoids page refresh process
        event.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name = message]').val()
        }, function (){

        });

    });
 
});