import axios from "axios";
import _ from "lodash";
import {
	WP_ENDPOINT,
	WP_CITY_PLACES,
	WP_CITY_PLACES_PER_PAGE
} from ".././config";

export async function fetchPlacesCategories() {
	let categories = await axios.get(WP_ENDPOINT + "categories");
	categories = _.map(categories.data, category =>
		_.pick(category, ["id", "name", "description"])
	);
	return categories;
}

export async function fetchAllPlaces(page) {
	let places = await axios.get(WP_ENDPOINT + WP_CITY_PLACES, {
		params: { page, per_page: WP_CITY_PLACES_PER_PAGE }
	});
	let pages = Number(places.headers["x-wp-totalpages"]);

	places = _.map(places.data, place => _.pick(place, ["id", "acf"]));
	return {
		places,
		page,
		pages
	};
}

export async function fetchPlacesCategory(page, category) {
	let places = await axios.get(WP_ENDPOINT + WP_CITY_PLACES, {
		params: { page, per_page: WP_CITY_PLACES_PER_PAGE, categories: [category] }
	});
	let pages = Number(places.headers["x-wp-totalpages"]);
	places = _.map(places.data, place => _.pick(place, ["id", "acf"]));
	return {
		places,
		page,
		pages
	};
}

export async function fetchInfinitePlaces(page, category, prevPlaces) {
	if (category === null) {
		let response = await fetchAllPlaces(page);
		return {
			places: _.concat(prevPlaces, response.places),
			page,
			pages: response.pages
		};
	} else {
		let response = await fetchPlacesCategory(page, category);
		return {
			places: _.concat(prevPlaces, response.places),
			page,
			pages: response.pages
		};
	}
}
