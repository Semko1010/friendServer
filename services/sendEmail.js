const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENT_ID =
	"645580390526-scu2tgc8u4lpae8jtgiskdli0sbkrm3l.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
	"1//04V7KWyI5hnSUCgYIARAAGAQSNwF-L9Irp0EBGn02OKDvi2RGmA50A2vF6wooS1yIHWlX79EhvVmgUAwseQp0EmD77sadkO0eTNI";

const OAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI,
);
OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

function sendEmail(options) {
	const ACCESS_TOKEN = OAuth2Client.getAccessToken();
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: "expenseehelp@gmail.com",
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
			accessToken: ACCESS_TOKEN,
		},
	});

	const to = options.to;
	const subject = options.subject;
	const message = options.message;

	const messageHtml = message.replaceAll("\n", "<br/>");

	return transporter
		.sendMail({
			from: '"Expensee" <expenseehelp@gmail.com>',
			to,
			subject,
			text: message,
			html: messageHtml,
		})
		.then(sentMessageInfo => {
			const wasSentSuccesssFully = sentMessageInfo.accepted.includes(to);
			if (wasSentSuccesssFully) {
				console.log("E-Mail was sent to", to);
				return true;
			} else {
				console.log("E-Mail was rejected by", to);
				return false;
			}
		})
		.catch(err => {
			console.log("Error sending Email", err);
			return err;
		});
}

module.exports = sendEmail;
