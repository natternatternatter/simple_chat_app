const express = require('express');
const app = express();
const http = require('http');
const { isObject } = require('util');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//grab the html file
app.get("/", (request, response) => {
    response.sendFile('/Users/mn/Documents/simple_chat_app/index.html');
});

//turn socket.io on
io.on("connection", (socket) => {

    console.log("user connected")

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //lets us know the server is recieving the message that is being emited from index.html (client)
    socket.on("chat message", (message) => {
        console.log("message: ", message);
        // after recieving the message, server sends out the message to everyone with io.emit
        // if you want to emit and send to everyone but not include the client who sent the 
        // message, use socket.broadcast.emit()
        io.emit('chat message', message);
    })
})

server.listen(3000, () => {
    console.log('listening on port 3000')
})
