<template>
	<section class="the-news-post">
		<div class="high-cutblock"></div>
		<div class="container">
			<div class="row">
				<div class="col-12 col-xl-9">
					<div class="wp-content-section" v-if="!loaded">
						<div class="wp-content">
							<div class="wp-heading">
								<div class="content-placeholder">
									<div class="container-loading h-line-1">
										<div class="line width-40"></div>
									</div>
									<div class="container-loading p-lines-16">
										<div class="line width-20"></div>
									</div>
								</div>
							</div>
							<div class="wp-text-container">
								<div class="content-placeholder">
									<div class="container-loading p-lines-18">
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="wp-content-section" v-else>
						<div class="wp-content">
							<div class="wp-heading">
								<h1 v-if="event.acf.event_name" v-html="event.acf.event_name"></h1>
								<div class="post-date" v-if="event.acf.event_date" v-html="event.acf.event_date"></div>
							</div>
							<div class="wp-text-container" v-if="event.content.rendered" v-html="event.content.rendered"></div>
						</div>
					</div>
				</div>
				<lastEvents :loaded="eventsLoaded" :events="events"></lastEvents>
			</div>
		</div>
	</section>
</template>

<script>
import store from "../../store/";
import lastEvents from "./lastEvents";
export default {
	name: "EventPost",
	store,
	components: {
		lastEvents
	},
	created() {
		this.$store.dispatch("EventPost/fetchEvents", this.$route.params.eventId);
		this.$store.dispatch("EventPost/fetchEvent", this.$route.params.eventId);
	},
	computed: {
		loaded() {
			return this.$store.state["EventPost"].loaded;
		},
		eventsLoaded() {
			return this.$store.state["EventPost"].eventsLoaded;
		},
		events() {
			return this.$store.state["EventPost"].events;
		},
		event() {
			return this.$store.state["EventPost"].event;
		}
	},
	watch: {
		$route(to, from) {
			if (to.params.eventId !== from.params.eventId) {
				this.$store.dispatch("EventPost/fetchEvents", to.params.eventId);
				this.$store.dispatch("EventPost/fetchEvent", to.params.eventId);
			}
		},
		loaded(state) {
			if (state === true) document.title = this.event.acf.event_name;
		}
	}
};
</script>
