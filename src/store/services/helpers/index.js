import axios from "axios";
import _ from "lodash";
import { WP_ENDPOINT } from ".././config";

export async function getEventsTags(events) {
	return await Promise.all(
		_.map(events, async event => {
			if (event.tags.length !== 0) {
				let tag = await axios.get(WP_ENDPOINT + "tags/" + event.tags[0]);
				event.tag = tag.data.name;
			} else {
				event.tag = null;
			}
			return _.pick(event, ["id", "acf", "tag"]);
		})
	);
}