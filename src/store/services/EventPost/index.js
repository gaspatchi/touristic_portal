import axios from "axios";
import _ from "lodash";
import { WP_ENDPOINT, WP_CITY_EVENTS } from ".././config";

export async function fetchEvents(eventId) {
	let events = await axios.get(WP_ENDPOINT + WP_CITY_EVENTS, {
		params: { exclude: eventId, per_page: 3 }
	});
	return events.data;
}

export async function fetchEvent(eventId){
	let event = await axios.get(WP_ENDPOINT + WP_CITY_EVENTS + "/" + eventId);
	event = _.pick(event.data, ["id","acf","content"]);
	return event;
}