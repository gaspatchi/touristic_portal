import {
	fetchProject,
	fetchComments,
	sendComment
} from "../../services/CityProject";

export default {
	namespaced: true,
	state: {
		error: false,
		commentsLoaded: false,
		loaded: false,
		project: {},
		page: 1,
		pages: 1,
		comments: []
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.comments = [];
		},
		saveProject(state, project) {
			state.error = false;
			state.loaded = true;
			state.project = project;
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
			state.commentsLoaded = false;
			state.project = {};
			state.comments = [];
		}
	},
	actions: {
		async fetchProject(store, projectId) {
			try {
				store.commit("startFetch");
				let project = await fetchProject(projectId);
				store.commit("saveProject", project);
				store.dispatch("fetchComments", 1);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить проект",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchComments(store, page) {
			try {
				let response = await fetchComments(
					store.state.project.id,
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
						message: "Невозможно загрузить комментарии",
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
