import { WP_ENDPOINT, WP_SLIDER_PLACES } from ".././config";
import axios from "axios";
import _ from "lodash";

export default async function() {
	let slides = await axios.get(WP_ENDPOINT + WP_SLIDER_PLACES);
	return _.map(slides.data, slide => _.pick(slide, ["id", "acf"]));
}
