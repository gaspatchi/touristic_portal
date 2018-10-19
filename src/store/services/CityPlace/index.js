import axios from "axios";
import _ from "lodash";
import { WP_ENDPOINT, WP_CITY_PLACES } from ".././config";

export default async function fetchPlace(placeId) {
	let place = await axios.get(WP_ENDPOINT + WP_CITY_PLACES + "/" + placeId);
	place = _.pick(place.data, ["id", "acf"]);
	return place;
}
