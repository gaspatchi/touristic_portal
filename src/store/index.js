import Vue from "vue";
import Vuex from "vuex";
import IndexSlider from "./modules/IndexSlider";
import HomeNews from "./modules/HomeNews";
import PageHeading from "./modules/PageHeading";
import SocialActivity from "./modules/SocialActivity";
import NewsFeed from "./modules/NewsFeed";
import EventPost from "./modules/EventPost";
import ProjectsFeed from "./modules/ProjectsFeed";
import CityProject from "./modules/CityProject";
import PlacesFeed from "./modules/PlacesFeed";
import CityPlace from "./modules/CityPlace";
import Feedback from "./modules/Feedback";
import CityForum from "./modules/CityForum";
import About from "./modules/About";
import AboutHome from "./modules/AboutHome";
import PrimaryMenu from "./modules/PrimaryMenu";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		IndexSlider,
		HomeNews,
		PageHeading,
		SocialActivity,
		NewsFeed,
		EventPost,
		ProjectsFeed,
		CityProject,
		PlacesFeed,
		CityPlace,
		Feedback,
		CityForum,
		About,
		AboutHome,
		PrimaryMenu
	}
});

export default store;
