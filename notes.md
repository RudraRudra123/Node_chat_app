
1. socket.broadcast.emit is being used to broadcast message to everyone except the originator.
    msg for chat room: "stocket.broadcast.to('room').emit()"
2. io.emit event is to broadcast message to every single conected user
    msg for chat room: "io.to('room name').emit()"
3. socket.emit event is to send message to one single user 
//----------------
1. MomentJs is a library to deal with timestamps and Date formats.
2. instal moment for server side usage
3. Copy the js file from momentjs.com site for client side usage. Do not copy it from node_modules folder. it is not working.
4. Download mustache.js for generating template.
Visit github page and navigate to latest version. copy mustache.js file and place it in "libs" folder.   
5. meta tag view port is to fit the page (to be responsive)
<meta name= "viewport" content = "width =device-width, initial-scale=1, user-scalable=no">  
6. To maintain different rooms we need to parse query params stored in "windows.location" object, 
windows.location.search

7.https://links.mead.io/deparam is a user defined jQuery function to destructure the query string and build an object.
Ex: jQuery.deparam, give you the function definition
    2. jQuery.deparam(window.location.search)