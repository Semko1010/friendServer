const ObjectId = require("mongodb").ObjectId;
const { _getDB } = require("./_getDB");

//create new User
async function createNewUser(user) {
	const db = await _getDB();
	const newUser = await db.collection("users").insertOne(user);
	return newUser;
}
//Check Name or email exist, User vorhanden in Datenbank
async function checkEmailExists(email) {
	const db = await _getDB();
	const user = await db.collection("users").findOne({
		$or: [{ email: email }],
	});

	return user;
}
//get user
async function loggedUserInfos(id) {
	const db = await _getDB();
	const foundUser = await db
		.collection("users")
		.findOne({ _id: new ObjectId(id) });
	const user = foundUser;

	return user;
}
async function gpsLocation(userobjid) {
	const db = await _getDB();
	const info = await db.collection("usersInfos").find().toArray();

	return info;
}

//addProduct
async function addUserLocation(userLocation) {
	const db = await _getDB();
	const Product = await db.collection("usersInfos").insertOne(userLocation);

	return Product;
}
//user.object_id

module.exports = {
	createNewUser,
	checkEmailExists,
	addUserLocation,
	loggedUserInfos,
	gpsLocation,
};
