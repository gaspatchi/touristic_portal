import axios from "axios";
import _ from "lodash";
import { WP_ENDPOINT, WP_ABOUT_CITY } from ".././config";

export default async function fetchCity() {
	let city = await axios.get(WP_ENDPOINT + WP_ABOUT_CITY, {
		params: { per_page: 1 }
	});
	city = _.pick(city.data[0], ["id", "content", "acf"]);
	return city;
}
