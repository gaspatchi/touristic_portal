export default {
	namespaced: true,
	state: {
		error: false,
		style: null,
		message: null
	},
	mutations: {
		showError(state, { style, message }) {
			state.error = true;
			state.style = style;
			state.message = message;
		},
		hideError(state) {
			state.error = false;
		}
	},
	actions: {
		showError(store, { style, message, time }) {
			store.commit("showError", { style, message });
			setTimeout(() => store.commit("hideError"), time * 1000);
		}
	}
};
