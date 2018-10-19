import axios from "axios";
import _ from "lodash";
import {
	WP_ENDPOINT,
	WP_CITY_FORUM,
	WP_CITY_FORUM_COMMENTS_PER_PAGE
} from ".././config";

export async function fetchThemes() {
	let themes = await axios.get(WP_ENDPOINT + WP_CITY_FORUM);
	themes = _.map(themes.data, theme =>
		_.pick(theme, ["id", "acf", "comment_status"])
	);
	return themes;
}

export async function fetchComments(post, page, prevComments) {
	let comments = await axios.get(WP_ENDPOINT + "comments", {
		params: { post: post, page, per_page: WP_CITY_FORUM_COMMENTS_PER_PAGE }
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
