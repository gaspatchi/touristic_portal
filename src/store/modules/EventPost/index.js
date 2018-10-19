import { fetchEvents, fetchEvent } from "../../services/EventPost";

export default {
	namespaced: true,
	state: {
		error: false,
		eventsLoaded: false,
		loaded: false,
		events: [],
		event: {}
	},
	mutations: {
		startFetchEvents(state) {
			state.eventsLoaded = false;
		},
		startFetch(state) {
			state.error = false;
			state.loaded = false;
		},
		saveEvents(state, events) {
			state.eventsLoaded = true;
			state.events = events;
		},
		saveEvent(state, event) {
			state.error = false;
			state.loaded = true;
			state.event = event;
		},
		throwError(state) {
			state.error = true;
			state.eventsLoaded = false;
			state.loaded = false;
			state.events = [];
			state.event = {};
		}
	},
	actions: {
		async fetchEvents(store, eventId) {
			try {
				store.commit("startFetchEvents");
				let events = await fetchEvents(eventId);
				store.commit("saveEvents", events);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "warning",
						message: "Невозможно загрузить последние новости",
						time: 3
					},
					{ root: true }
				);
			}
		},
		async fetchEvent(store, eventId) {
			try {
				store.commit("startFetch");
				let event = await fetchEvent(eventId);
				store.commit("saveEvent", event);
			} catch (e) {
				store.commit("throwError");
				store.dispatch(
					"PageHeading/showError",
					{
						style: "danger",
						message: "Невозможно загрузить новость",
						time: 3
					},
					{ root: true }
				);
			}
		}
	}
};
