let socket = io(); 
function scrollToBottom() {
    //selectors
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight(); 

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
        messages.scrollTop(scrollHeight);
}
//const { generateMessage } = require('/../server/**/message.js');
socket.on('connect', function () {
    console.log('Connected to server');
    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
        else {
            console.log('no error');
            $('#room').text(params.room);
        }

    });
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    let ol = $('<ol></ol>');
    users.forEach((user) =>{
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('newMessage', function(message){
    let template = $('#message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    }); 
    $('#messages').append(html);
    scrollToBottom();
     
});

//Location services
let locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation)
        return alert('Geolocation not supported by your browser.');
    //disabled button while the server is sending the location details
    locationButton.attr('disabled', 'disabled').text('Sending location');
    navigator.geolocation.getCurrentPosition(function (position){

        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, 
    function (){
        altert('Unable to fetch location.');
        locationButton.removeAttr('disabled').text('Send location');
    });

    });

socket.on('newLocationMessage', function(message){
    let template = $('#location-message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    }); 

    $('#messages').append(html);
    scrollToBottom();
});    
//socket.emit('createMessage', generateMessage('fromClient','Message from index.js'));

    let form = $('#message-form');
    form.submit(function (event){
        // Prevent the form from submitting via the browser.
        //avoids page refresh process
        event.preventDefault();
        var messageTextbox = $('[name = message]');
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function () {
            //acknowledgement setup currently not supporting
            messageTextbox.val('');
        
        });

    });
//Exit room    
let exitRoom = $('#exit');
exitRoom.on('click', function () {
    let params = jQuery.deparam(window.location.search);
    socket.emit('leaveRoom', {
        room: params.room
    });
    window.location.href = '/';
});
 
 