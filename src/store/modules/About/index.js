import fetchCity from "../../services/About";
export default {
	namespaced: true,
	state: {
		loaded: false,
		city: {},
		error: false
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.city = {};
		},
		saveCity(state, city) {
			state.loaded = true;
			state.error = false;
			state.city = city;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.city = {};
		}
	},
	actions: {
		async fetchCity(store) {
			try {
				store.commit("startFetch");
				let city = await fetchCity();
				store.commit("saveCity", city);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить статью",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
