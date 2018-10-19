import axios from "axios";
import _ from "lodash";
import { WP_ENDPOINT, WP_CURRENT_PROJECT } from ".././config";

export default async function() {
	let project = await axios.get(WP_ENDPOINT + WP_CURRENT_PROJECT);
	return _.pick(project.data[0], ["acf"]);
}
