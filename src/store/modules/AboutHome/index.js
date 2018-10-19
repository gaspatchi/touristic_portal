import fetchFacts from "../../services/AboutHome";

export default {
	namespaced: true,
	state: {
		loaded: false,
		error: false,
		facts: []
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.facts = [];
		},
		saveFacts(state, facts) {
			state.loaded = true;
			state.error = false;
			state.facts = facts;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.facts = [];
		}
	},
	actions: {
		async fetchFacts(store) {
			try {
				store.commit("startFetch");
				let facts = await fetchFacts();
				store.commit("saveFacts", facts);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить факты",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
