//token middleware
//im headers schauen, ob der token da ist
//bei jeder Route prüfen, ob ein token vorhanden ist
//header ist bei jeder Route dabei, body nicht immer

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers.usertoken;

	if (token) {
		try {
			const jwtPayload = jwt.verify(token, "SemirDerSuperCoder");
			req.userId = jwtPayload.sub;
			next();
		} catch (error) {
			res.send({ err: "Token invalid" });
		}
	} else {
		res.send({ err: "Error, no token" });
	}
};

module.exports = {
	verifyToken,
};
