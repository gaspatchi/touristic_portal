import Vue from "vue";
import Router from "vue-router";
import Index from "../containers/Index";
import AllEvents from "../containers/AllEvents";
import NewsPost from "../containers/NewsPost";
import AllProjects from "../containers/AllProjects";
import ProjectPage from "../containers/ProjectPage";
import AllPlaces from "../containers/AllPlaces";
import PlacePage from "../containers/PlacePage";
import PostFeedback from "../containers/PostFeedback";
import ForumPage from "../containers/ForumPage";
import AboutCity from "../containers/AboutCity";
import NotFound from "../containers/NotFound";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			component: Index,
			meta: {
				title: "Главная страница"
			}
		},
		{
			path: "/events",
			component: AllEvents,
			meta: {
				title: "Все события"
			}
		},
		{
			path: "/events/:eventId",
			component: NewsPost,
			meta: {
				title: "Событие"
			}
		},
		{
			path: "/projects",
			component: AllProjects,
			meta: {
				title: "Все проекты"
			}
		},
		{
			path: "/projects/:projectId",
			component: ProjectPage,
			meta: {
				title: "Проект"
			}
		},
		{
			path: "/places",
			component: AllPlaces,
			meta: {
				title: "Все места"
			}
		},
		{
			path: "/places/:placeId",
			component: PlacePage,
			meta: {
				title: "Место"
			}
		},
		{
			path: "/feedback",
			component: PostFeedback,
			meta: {
				title: "Оставить обращение"
			}
		},
		{
			path: "/about",
			component: AboutCity,
			meta: {
				title: "Об округе"
			}
		},
		{
			path: "/forum",
			component: ForumPage,
			meta: {
				title: "Форум"
			}
		},
		{
			path: "*",
			component: NotFound,
			meta: {
				title: "Страница не найдена"
			}
		}
	],
	scrollBehavior() {
		return { x: 0, y: 0 };
	}
});

export default router;
