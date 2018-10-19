<template>
	<section class="home-news">
		<h3 class="section-heading container">Последние события округа</h3>
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-3" v-if="!loaded" v-for="cap in [1,2,3]" :key="cap">
					<div class="wrapper-post">
						<div class="post-photo"></div>
						<div class="post-info">
							<div class="heading">
								<div class="content-placeholder">
									<div class="container-loading p-lines-18">
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-3" v-for="event in events" :key="event.id">
					<div :class="[{'without-hover': !event.acf.event_name}, 'wrapper-post']">
						<div class="tags">
							<div class="data" v-if="event.acf.event_date" v-html="event.acf.event_date"></div>
							<div class="tag" v-if="event.tag" v-html="event.tag"></div>
						</div>
						<div class="post-photo" :style="{ 'background-image': 'url(' + event.acf.event_image + ')' }"></div>
						<div class="post-info">
							<div class="heading">
								<h4 v-html="event.acf.event_name"></h4>
							</div>
							<div class="description">
								<p v-html="event.acf.event_summary"></p>
								<div class="btn-center">
									<router-link :to="'events/' + event.id">Подробнее</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="wrapper-btn-center">
				<router-link to="/events" class="btn">К событиям
					<div class="icon right-arrow"></div>
				</router-link>
			</div>
		</div>
		<div class="cutblock"></div>
	</section>
</template>

<script>
import store from "../../store/";
export default {
	name: "HomeNews",
	store,
	created() {
		this.$store.dispatch("HomeNews/fetchEvents");
	},
	computed: {
		loaded() {
			return this.$store.state["HomeNews"].loaded;
		},
		events() {
			return this.$store.state["HomeNews"].events;
		}
	}
};
</script>
