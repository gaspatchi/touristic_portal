import axios from "axios";
import _ from "lodash";
import {
	WP_ENDPOINT,
	WP_CITY_PROJECTS,
	WP_CITY_PROJECTS_COMMENTS_PER_PAGE
} from ".././config";

export async function fetchProject(projectId) {
	let project = await axios.get(
		WP_ENDPOINT + WP_CITY_PROJECTS + "/" + projectId
	);
	project = _.pick(project.data, ["id", "acf", "comment_status"]);
	return project;
}

export async function fetchComments(post, page, prevComments) {
	let comments = await axios.get(WP_ENDPOINT + "comments", {
		params: { post: post, page, per_page: WP_CITY_PROJECTS_COMMENTS_PER_PAGE }
	});
	let pages = Number(comments.headers["x-wp-totalpages"]);
	comments = _.concat(
		prevComments,
		_.map(comments.data, comment =>
			_.pick(comment, ["id", "acf", "date", "parent", "content", "author_name"])
		)
	);
	return {
		comments,
		page,
		pages
	};
}

export async function sendComment(data) {
	await axios.post(WP_ENDPOINT + "comments", data);
}
