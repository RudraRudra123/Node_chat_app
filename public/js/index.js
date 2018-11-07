let socket = io(); 

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
});

 
