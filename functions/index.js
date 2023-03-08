const express = require("express");
const app = express();
const PORT = process.env.PORT || 2020;
const cors = require("cors");
app.use(express.json({ limit: "16mb" }));
app.use(cors());

//socket.io
const server = require("http").createServer(app);

// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "*",
// 	},
// });
// const users = [];
// io.on("connection", client => {
// 	client.on("username", (username, userObjId) => {
// 		const user = {
// 			name: username,
// 			id: client.id,
// 			userObjId: userObjId,
// 		};

// 		users.filter(item => {
// 			if (item.userObjId === userObjId) {
// 				const indexOfUser = users.indexOf(item);
// 				users.splice(indexOfUser, 1);
// 			}
// 		});
// 		users.push(user);

// 		client.emit("connected", user);
// 		io.emit("users", Object.values(users));
// 	});
// 	client.on("join_room", data => {
// 		client.join(data);
// 		console.log(client.rooms);

// 		console.log(`User with id ${client.id} join the room ${data}`);
// 	});
// 	client.on("leave_room", data => {
// 		client.leave(data);
// 		console.log(data);
// 		console.log(client.rooms);
// 		console.log(`User with id ${client.id} Leave the room ${data}`);
// 	});

// 	client.on("chat", (message, info, token) => {
// 		console.log(info);
// 		client.to(info).emit("recieved_message", { message, info, token });
// 	});

// 	// client.on("disconnect", data => {
// 	// 	console.log("Users Disconect", client.id);
// 	// 	users.find(id => {
// 	// 		if (client.id === id.id) {
// 	// 			console.log("DC USER", id);
// 	// 		}
// 	// 	});

// 	// 	// const username = users[client.id];
// 	// 	// delete users[client.id];
// 	// 	// io.emit("disconnected", users);
// 	// });
// });

//imports
const {
	gpsLocation,
	addUserLocation,
	loggedUserInfos,
	changeUserInfos,
} = require("../db_access/user_dao");
const { registerUser } = require("../services/registerUser");
const loginUser = require("../services/loginUser");
const { deleteAmount } = require("../services/deleteAmount");
const { verifyToken } = require("../services/verifyToken");
const res = require("express/lib/response");

//Post
app.post("/api/friend/users/register", (req, res) => {
	const userName = req.body.userName.trim().toLowerCase();
	const email = req.body.email.trim().toLowerCase();
	const img = req.body.props.infos.img;
	const age = req.body.props.infos.age;
	const hobby = req.body.props.infos.hobby;
	const desc = req.body.props.infos.desc;
	const password = req.body.password.trim();
	const verify = req.body.verify;

	registerUser({ userName, email, img, password, verify, age, hobby, desc })
		.then(() => {
			res.send({ userCreated: true });
		})
		.catch(err => {
			res.send({ userExist: true });
		});
});

app.post("/api/friend/users/login", (req, res) => {
	const email = req.body.email.trim().toLowerCase();
	const password = req.body.password.trim();
	console.log("email", email);
	loginUser({ email, password })
		.then(token => {
			res.send(token);
		})
		.catch(err => {
			res.send({ error: err });
		});
});

app.post("/api/friend/users/userLocation", (req, res) => {
	const userLocation = req.body;
	console.log(userLocation);
	addUserLocation(userLocation).then(res.send({ locationSet: true }));
});

app.post("/api/friend/users/deleteLocation", (req, res) => {
	const idGps = req.body.userObjId;

	deleteAmount(idGps).then(res.send({ locationRemoved: true }));
});

app.post("/api/friend/users/changeUserInfos", verifyToken, (req, res) => {
	const userName = req.body.userName;
	const hobby = req.body.hobby;
	const desc = req.body.desc;
	const userObjId = req.headers.userobjid;
	console.log(userObjId);
	changeUserInfos(userName, hobby, desc, userObjId).then(
		res.send({ infosUpdate: true }),
	);
});

//get

app.get("/", (req, res) => {
	res.send("info");
});

app.get("/api/friend/users/gpsLocation", verifyToken, (req, res) => {
	gpsLocation().then(info => {
		res.send(info);
	});
});

app.get("/api/friend/users/loggedUserInfo", verifyToken, (req, res) => {
	const id = req.headers.userobjid;

	loggedUserInfos(id).then(user => {
		res.send(user);
	});
});

server.listen(PORT, () => console.log("Server läuft auf Port", PORT));
