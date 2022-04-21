const { _getDB } = require("../db_access/_getDB");
const ObjectId = require("mongodb").ObjectId;

async function deleteAmount(idGps) {
	const db = await _getDB();
	const deleteFavorite = db
		.collection("usersInfos")
		.deleteOne({ userObjId: idGps });
	return deleteFavorite;
}

module.exports = {
	deleteAmount,
};
