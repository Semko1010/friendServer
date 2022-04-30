const express = require("express");
const app = express();
const PORT = process.env.PORT || 2020;
const cors = require("cors");
app.use(express.json({ limit: "16mb" }));
app.use(cors());
//imports
const { userInfo, addUserLocation } = require("./db_access/user_dao");
const { registerUser } = require("./services/registerUser");
const loginUser = require("./services/loginUser");
const { deleteAmount } = require("./services/deleteAmount");
const { verifyToken } = require("./services/verifyToken");
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

//get
app.get("/api/friend/users/userInfo", verifyToken, (req, res) => {
	userInfo().then(info => {
		res.send(info);
	});
});

app.listen(PORT, () => console.log("Server läuft auf Port", PORT));
