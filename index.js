const express = require("express");
const app = express();
const PORT = process.env.PORT || 2020;
const cors = require("cors");
app.use(express.json({ limit: "16mb" }));
app.use(cors());
//imports
const { userInfo, createNewUser } = require("./db_access/user_dao");
const { registerUser } = require("./services/registerUser");

//Post
app.post("/api/friend/users/register", (req, res) => {
	const userName = req.body.userName;
	const email = req.body.email.trim().toLowerCase();
	const img = req.body.img;
	const password = req.body.password.trim();
	const verify = req.body.verify;

	registerUser({ userName, email, img, password, verify })
		.then(() => {
			res.send({ userExist: false });
		})
		.catch(err => {
			res.send({ userExist: true });
		});
});

app.post("/api/friend/users/userInfo", (req, res) => {
	res.send("works");
});

//get
app.get("/api/friend/users/userInfo", (req, res) => {
	userInfo().then(info => {
		res.send(info);
	});
});

app.listen(PORT, () => console.log("Server läuft auf Port", PORT));
