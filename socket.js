const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 2020;

io.on("connection", socket => {
	console.log(socket.id);

	socket.on("chat", data => {
		// socket.broadcast.emit("reciveChat", data);
		console.log(data);
		io.emit("chat", data);
	});
});

server.listen(PORT, () => console.log("Socket", PORT));
