const express = require("express");
const app = express();
const PORT = process.env.PORT || 2020;
//imports
const { userInfo } = require("./db_access/user_dao");

app.get("/api/friend/users/userInfo", (req, res) => {
	userInfo().then(info => {
		res.send(info);
	});
});

app.listen(PORT, () => console.log("Server läuft auf Port", PORT));
