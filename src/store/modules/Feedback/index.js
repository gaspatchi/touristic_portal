import postFeedback from "../../services/Feedback";

export default {
	namespaced: true,
	state: {
		error: false,
		loaded: false
	},
	mutations: {
		postFeedback(state) {
			state.error = false;
			state.loaded = false;
		},
		successFeedback(state) {
			state.error = false;
			state.loaded = true;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
		}
	},
	actions: {
		async postFeedback(store, message) {
			try {
				store.commit("postFeedback");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "success",
						message: "Обращение отправляется",
						time: 3
					},
					{ root: true }
				);
				let feedback = await postFeedback(message);
				if (feedback === 200) {
					store.commit("successFeedback");
				}
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно отправить обращение",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
