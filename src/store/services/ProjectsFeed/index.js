import axios from "axios";
import _ from "lodash";
import {
	WP_ENDPOINT,
	WP_CITY_PROJECTS,
	WP_CITY_PROJECTS_PER_PAGE
} from ".././config";

export default async function fetchAllProjects(page, prevProjects) {
	let projects = await axios.get(WP_ENDPOINT + WP_CITY_PROJECTS, {
		params: {
			page,
			per_page: WP_CITY_PROJECTS_PER_PAGE
		}
	});
	let pages = Number(projects.headers["x-wp-totalpages"]);
	projects = _.concat(
		prevProjects,
		_.map(projects.data, project => _.pick(project, ["id", "acf"]))
	);
	return {
		projects,
		page,
		pages
	};
}
