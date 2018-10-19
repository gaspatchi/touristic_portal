import fetchProject from "../../services/SocialActivity";

export default {
	namespaced: true,
	state: {
		error: false,
		loaded: false,
		project: null
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.project = null;
		},
		saveProject(state, project) {
			state.error = false;
			state.loaded = true;
			state.project = project;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.project = null;
		}
	},
	actions: {
		async fetchProject(store) {
			try {
				store.commit("startFetch");
				let project = await fetchProject();
				store.commit("saveProject", project);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "warning",
						message: "Невозможно загрузить проект",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
