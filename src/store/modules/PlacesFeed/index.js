import {
	fetchPlacesCategories,
	fetchAllPlaces,
	fetchPlacesCategory,
	fetchInfinitePlaces
} from "../../services/PlacesFeed";

export default {
	namespaced: true,
	state: {
		error: false,
		categoriesLoaded: false,
		loaded: false,
		category: null,
		page: 1,
		pages: 1,
		categories: [],
		places: []
	},
	mutations: {
		startFetchCategories(state) {
			state.categoriesLoaded = false;
		},
		startFetch(state) {
			state.error = false;
			state.loaded = false;
		},
		saveCategories(state, categories) {
			state.categoriesLoaded = true;
			state.categories = categories;
		},
		savePlaces(state, { places, page, pages }) {
			state.error = false;
			state.loaded = true;
			state.places = places;
			state.page = page;
			state.pages = pages;
		},
		changeCategory(state, category) {
			state.page = 1;
			state.pages = 1;
			state.places = [];
			state.category = category;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.categoriesLoaded = false;
			state.category = null;
			state.categories = [];
			state.places = [];
		}
	},
	actions: {
		async fetchPlacesCategories(store) {
			try {
				store.commit("startFetchCategories");
				let categories = await fetchPlacesCategories();
				store.commit("saveCategories", categories);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить категории",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchAllPlaces(store, page) {
			try {
				store.commit("startFetch");
				let response = await fetchAllPlaces(page);
				store.commit("savePlaces", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить места",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchPlacesCategory(store, category) {
			try {
				store.commit("startFetch");
				store.commit("changeCategory", category);
				if (category === null) {
					store.dispatch("fetchAllPlaces", 1);
				} else {
					let response = await fetchPlacesCategory(1, category);
					store.commit("savePlaces", response);
				}
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить категории мест",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchInfinitePlaces(store, page) {
			try {
				store.commit("startFetch");
				let response = await fetchInfinitePlaces(
					page,
					store.state.category,
					store.state.places
				);
				store.commit("savePlaces", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить места",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
