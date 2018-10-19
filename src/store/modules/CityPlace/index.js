import fetchPlace from "../../services/CityPlace";

export default {
	namespaced: true,
	state: {
		error: false,
		loaded: false,
		place: {}
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
		},
		savePlace(state, place) {
			state.error = false;
			state.loaded = true;
			state.place = place;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.place = {};
		}
	},
	actions: {
		async fetchPlace(store, placeId) {
			try {
				store.commit("startFetch");
				let place = await fetchPlace(placeId);
				store.commit("savePlace", place);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить место",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
