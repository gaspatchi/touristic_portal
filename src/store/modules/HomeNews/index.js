import fetchEvents from "../../services/HomeNews";

export default {
	namespaced: true,
	state: {
		error: false,
		loaded: false,
		events: []
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.events = [];
		},
		saveEvents(state, events) {
			state.error = false;
			state.loaded = true;
			state.events = events;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.events = [];
		}
	},
	actions: {
		async fetchEvents(store) {
			try {
				store.commit("startFetch");
				let events = await fetchEvents();
				store.commit("saveEvents", events);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить события",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
