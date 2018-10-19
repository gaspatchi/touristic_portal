import fetchAllProjects from "../../services/ProjectsFeed";

export default {
	namespaced: true,
	state: {
		error: false,
		loaded: false,
		page: 1,
		pages: 1,
		projects: []
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
		},
		saveProjects(state, { projects, page, pages }) {
			state.error = false;
			state.loaded = true;
			state.projects = projects;
			state.page = page;
			state.pages = pages;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.projects = [];
		}
	},
	actions: {
		async fetchAllProjects(store, page) {
			try {
				store.commit("startFetch");
				let projects = page === 1 ? [] : store.state.projects;
				let response = await fetchAllProjects(page, projects);
				store.commit("saveProjects", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить проекты",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
