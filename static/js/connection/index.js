// index.js

var socket = new WebSocket("ws://127.0.0.1:8081/ws");

socket.onopen = function() {
    console.log("connection established.");
};

socket.onclose = function(event) {
    console.log("connection closed.");
};

module.exports = socket;