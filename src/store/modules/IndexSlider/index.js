import fetchSlides from "../../services/IndexSlider";

export default {
	namespaced: true,
	state: {
		error: false,
		loaded: false,
		slides: []
	},
	mutations: {
		startFetch(state) {
			state.error = false;
			state.loaded = false;
			state.slides = [];
		},
		saveSlides(state, slides) {
			state.error = false;
			state.loaded = true;
			state.slides = slides;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.slides = [];
		}
	},
	actions: {
		async fetchSlides(store) {
			try {
				store.commit("startFetch");
				let slides = await fetchSlides();
				store.commit("saveSlides", slides);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить слайдер",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
