const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3030;
io.on("connection", socket => {
	console.log(socket.id);
});

server.listen(PORT, () => console.log("Server läuft auf Port", PORT));
