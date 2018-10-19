import {
	fetchEventsTags,
	fetchAllEvents,
	fetchEventsWithSearch,
	fetchEventsWithTag,
	fetchInfiniteEvents
} from "../../services/NewsFeed";

export default {
	namespaced: true,
	state: {
		error: false,
		tagsLoaded: false,
		loaded: false,
		page: 1,
		pages: 1,
		events: [],
		search: "",
		tag: null,
		tags: []
	},
	mutations: {
		startFetchTags(state) {
			state.tagsLoaded = false;
		},
		startFetch(state) {
			state.error = false;
			state.loaded = false;
		},
		saveTags(state, tags) {
			state.tagsLoaded = true;
			state.tags = tags;
		},
		saveEvents(state, { events, page, pages }) {
			state.error = false;
			state.loaded = true;
			state.events = events;
			state.page = page;
			state.pages = pages;
		},
		saveSearch(state, search) {
			state.search = search;
			state.tag = null;
		},
		resetSearch(state) {
			state.search = "";
		},
		saveTag(state, tag) {
			state.tag = tag;
		},
		resetTag(state) {
			state.tag = null;
		},
		throwError(state) {
			state.error = true;
			state.loaded = false;
			state.tagsLoaded = false;
			state.events = [];
			state.tags = [];
		}
	},
	actions: {
		async fetchEventsTags(store) {
			try {
				store.commit("startFetchTags");
				let tags = await fetchEventsTags();
				store.commit("saveTags", tags);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить теги",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchAllEvents(store, page) {
			try {
				store.commit("startFetch");
				let response = await fetchAllEvents(page);
				store.commit("saveEvents", response);
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
		},
		async fetchEventsWithSearch(store, search) {
			try {
				store.commit("startFetch");
				store.commit("saveSearch", search);
				let response = await fetchEventsWithSearch(1, search);
				store.commit("saveEvents", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить результаты поиска",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchEventsWithTag(store, tag) {
			try {
				store.commit("startFetch");
				store.commit("saveTag", tag);
				let response = await fetchEventsWithTag(1, tag);
				store.commit("saveEvents", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить события c тегом",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchInfiniteEvents(store) {
			try {
				store.commit("startFetch");
				let response = await fetchInfiniteEvents(
					store.state.page + 1,
					store.state.events,
					store.state.search,
					store.state.tag
				);
				store.commit("saveEvents", response);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить следующие события",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
