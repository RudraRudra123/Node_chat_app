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

//Location services
let locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation)
        return alert('Geolocation not supported by your browser.');
    navigator.geolocation.getCurrentPosition(function (position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, 
    function (){
        altert('Unable to fetch location.');
    });

    });

socket.on('newLocationMessage', function(message){
    let li = $('<li></li>');
    let a  = $('<a target="_blank">MyCurrentLocation</a>');
    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});    
//socket.emit('createMessage', generateMessage('fromClient','Message from index.js'));

    let form = $('#message-form');
    form.submit(function (event){
        // Prevent the form from submitting via the browser.
        //avoids page refresh process
        event.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name = message]').val()
        }, function (){
            //acknowledgement setup currently not supporting
        });

    });
 
 