const { createNewUser, checkEmailExists } = require("../db_access/user_dao");
const { hashPassword } = require("../utillity/pwHash");
// const sendEmail = require("./sendEmail");

async function registerUser({ userName, email, password, img, verify }) {
	//checkEmailExist

	const foundUser = await checkEmailExists(email);

	if (foundUser) {
		console.log("user Exist! Please Log in!");
		throw new Error("User with this Email already exist. Please log in!");
	}
	// create passwordHash
	const passwordHash = hashPassword(password);
	//create NewUsers
	const newUser = {
		userName,
		email,
		passwordHash,
		img,
		verify,
	};
	console.log(newUser.email);
	const insertResult = await createNewUser(newUser);
	if (!insertResult.acknowledged) {
		throw new Error("Failed to create new User");
	}

	// 	const emailSend = await sendEmail({
	// 		to: email,
	// 		subject: "Expensee Verifizierung !",
	// 		message: `Hi ${newUser.username}!

	// 		Danke für das benutzen von Expensee

	// 		Um Expensee zu nutzen musst du deine Email Verifizieren !

	// 		Klicke bitte auf den folgenden Link:
	// <a href="https://expenseeserver.herokuapp.com/api/expensee/users/verifyEmail/${newUser.email}/${newUser.string}">Verifizieren</a>

	// 		Viel Spass beim nutzen von Expensee

	// 		Dein Expensee Support

	// 		Bei Fragen oder Hilfestellung stehen wir ihnen zur verfügung
	// 		`,
	// 	});
	return;
}

module.exports = {
	registerUser,
};
