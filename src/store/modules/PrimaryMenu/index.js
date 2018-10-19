import fetchLinks from "../../services/PrimaryMenu";

export default {
	namespaced: true,
	state: {
		open: false,
		error: false,
		loaded: false,
		events: [],
		projects: [],
		places: []
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.events = [];
			state.projects = [];
			state.places = [];
		},
		openMenu(state) {
			state.open = true;
			state.loaded = false;
		},
		closeMenu(state) {
			state.open = false;
		},
		saveLinks(state, { events, projects, places }) {
			state.error = false;
			state.loaded = true;
			state.events = events;
			state.projects = projects;
			state.places = places;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.events = [];
			state.projects = [];
			state.places = [];
		}
	},
	actions: {
		async fetchLinks(store) {
			try {
				let links = await fetchLinks();
				store.commit("saveLinks", links);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить элементы меню",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
