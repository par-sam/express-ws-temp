const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server:server });

wss.on("connection", function connection(ws) {
    console.log("New connection");
    ws.on("message", function incoming(message, isBinary) {
        console.log("received: %s", message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message, { binary: isBinary });
            }
        });
    });
    ws.send("Hello from server");
});

app.get("/", (req, res) => {
    res.send("Test Websockets");
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});