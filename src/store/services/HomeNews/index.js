import axios from "axios";
import { WP_ENDPOINT, WP_CITY_EVENTS } from ".././config";
import { getEventsTags } from ".././helpers/";

export default async function() {
	let events = await axios.get(WP_ENDPOINT + WP_CITY_EVENTS, {
		params: { page: 1, per_page: 3 }
	});
	events = await getEventsTags(events.data);
	return events;
}
