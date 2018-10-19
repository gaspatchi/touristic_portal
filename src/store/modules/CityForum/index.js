import {
	fetchThemes,
	fetchComments,
	sendComment
} from "../../services/CityForum";
import _ from "lodash";

export default {
	namespaced: true,
	state: {
		commentsLoaded: false,
		loaded: false,
		themes: [],
		themeId: null,
		theme: {},
		page: 1,
		pages: 1,
		comments: [],
		error: false
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.commentsLoaded = false;
		},
		saveThemes(state, themes) {
			state.themes = themes;
		},
		changeTheme(state, theme) {
			state.themeId = theme.id;
			state.theme = theme;
			state.commentsLoaded = false;
			state.comments = [];
			state.loaded = true;
		},
		saveComments(state, { page, pages, comments }) {
			state.page = page;
			state.pages = pages;
			state.comments = comments;
			state.commentsLoaded = true;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.themes = [];
			state.commentsLoaded = false;
			state.comments = [];
		}
	},
	actions: {
		async fetchThemes(store) {
			try {
				store.commit("startFetch");
				let themes = await fetchThemes();
				store.commit("saveThemes", themes);
				store.dispatch("changeTheme", themes[0].id);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно получить темы форума",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async changeTheme(store, theme) {
			try {
				store.commit("startFetch");
				theme = _.find(store.state.themes, { id: theme });
				store.commit("changeTheme", theme);
				store.dispatch("fetchComments", 1);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно выбрать тему",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchComments(store, page) {
			try {
				let response = await fetchComments(
					store.state.theme.id,
					page,
					store.state.comments
				);
				store.commit("saveComments", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно получить комментарии",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async sendComment(store, data) {
			try {
				await sendComment(data);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно отправить комментарий",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
