import axios from "axios";
import _ from "lodash";
import {
	WP_ENDPOINT,
	WP_CITY_EVENTS,
	WP_CITY_PROJECTS,
	WP_CITY_PLACES
} from ".././config";

export default async function fetchLinks() {
	let events = axios.get(WP_ENDPOINT + WP_CITY_EVENTS);
	let projects = axios.get(WP_ENDPOINT + WP_CITY_PROJECTS);
	let places = axios.get(WP_ENDPOINT + WP_CITY_PLACES);
	let result = await Promise.all([events, projects, places]);
	let allLinks = [];
	for (const link of result) {
		allLinks.push(_.map(link.data, link => _.pick(link, ["id", "acf"])));
	}
	return {
		events: allLinks[0],
		projects: allLinks[1],
		places: allLinks[2]
	};
}
