import axios from "axios";
import _ from "lodash";
import {
	WP_ENDPOINT,
	WP_CITY_EVENTS,
	WP_CITY_EVENTS_PER_PAGE
} from ".././config";
import { getEventsTags } from ".././helpers/";

export async function fetchEventsTags() {
	let tags = await axios.get(WP_ENDPOINT + "tags/");
	tags = Promise.all(_.map(tags.data, tag => _.pick(tag, ["id", "name"])));
	return tags;
}

export async function fetchAllEvents(page) {
	let events = await axios.get(WP_ENDPOINT + WP_CITY_EVENTS, {
		params: { page, per_page: WP_CITY_EVENTS_PER_PAGE }
	});
	let pages = Number(events.headers["x-wp-totalpages"]);
	events = await getEventsTags(events.data);
	return {
		events,
		page,
		pages
	};
}

export async function fetchEventsWithSearch(page, search) {
	let events = await axios.get(WP_ENDPOINT + WP_CITY_EVENTS, {
		params: { page, per_page: WP_CITY_EVENTS_PER_PAGE, search }
	});
	let pages = Number(events.headers["x-wp-totalpages"]);
	events = await getEventsTags(events.data);
	return {
		events,
		page,
		pages
	};
}

export async function fetchEventsWithTag(page, tag) {
	let events = await axios.get(WP_ENDPOINT + WP_CITY_EVENTS, {
		params: { page, per_page: WP_CITY_EVENTS_PER_PAGE, tags: [tag] }
	});
	let pages = Number(events.headers["x-wp-totalpages"]);
	events = await getEventsTags(events.data);
	return {
		events,
		page,
		pages
	};
}

export async function fetchInfiniteEvents(page, prevEvents, search, tag) {
	if (search !== "") {
		let response = await fetchEventsWithSearch(page, search);
		return {
			events: _.concat(prevEvents, response.events),
			page,
			pages: response.pages
		};
	}
	if (tag !== null) {
		let response = await fetchEventsWithTag(page, search);
		return {
			events: _.concat(prevEvents, response.events),
			page,
			pages: response.pages
		};
	}
	let response = await fetchAllEvents(page);
	return {
		events: _.concat(prevEvents, response.events),
		page,
		pages: response.pages
	};
}
