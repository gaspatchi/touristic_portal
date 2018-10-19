import axios from "axios";
import _ from "lodash";
import { WP_ENDPOINT, WP_CITY_FACTS } from ".././config";

export default async function fetchFacts() {
	let facts = await axios.get(WP_ENDPOINT + WP_CITY_FACTS, {
		params: { per_page: 6 }
	});
	facts = _.map(facts.data, fact => _.pick(fact, ["id", "acf"]));
	return facts;
}
