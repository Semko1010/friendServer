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

async function changeUserInfos(userName, hobby, desc, userObjId) {
	const db = await _getDB();
	// const changeInfos = await db.collection("users").updateOne(
	// 	{
	// 		_id: ObjectId(userObjId),
	// 	},
	// 	{
	// 		$push: {
	// 			userName: userName,
	// 			hobby: hobby,
	// 			desc: desc,
	// 		},
	// 	},
	// );
	const changeInfos = await db.collection("users").updateOne(
		{
			_id: new ObjectId(userObjId),
		}, //welche Object_id soll geupdated werden
		{ $set: { userName: userName, hobby: hobby, desc: desc } },
	);
}

module.exports = {
	createNewUser,
	checkEmailExists,
	addUserLocation,
	loggedUserInfos,
	gpsLocation,
	changeUserInfos,
};
