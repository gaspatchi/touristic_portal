import axios from "axios";
import _ from "lodash";
import { FEEDBACK_PATH } from ".././config";

export default async function postFeedback(message) {
	message = _.pickBy(message, _.identity);
	let feedback = await axios.post(FEEDBACK_PATH, {
		fullname: message.fullname,
		email: message.email,
		phone: message.phone,
		subject: message.subject,
		text: message.text,
		link: message.link
	});
	return feedback.status;
}
