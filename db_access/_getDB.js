const { MongoClient } = require("mongodb");
require("dotenv").config();

let _db;

async function _getDB() {
	if (_db) {
		return _db;
	} else {
		const url =
			"mongodb+srv://m001-student:m001-mongodb-basics@cluster0.2ew6p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
		const client = new MongoClient(url);

		const connected_client = await client.connect();
		_db = connected_client.db("friend");
	}
	return _db;
}

module.exports = {
	_getDB,
};

// process.env.DB_URL;
