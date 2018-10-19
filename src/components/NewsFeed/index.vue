<template>
	<section class="news-feed">
		<div class="cutblock"></div>
		<div class="container">
			<div class="row lg-down-reversive">
				<div class="col-12 col-sm-9 col-md-10 col-lg-12 col-xl-9">
					<div class="row feed">
						<div class="col-12 col-sm-12 col-sm-8 col-md-6 col-lg-4 col-xl-4" v-for="event in events" :key="event.id">
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
						<div class="no-resultes" v-if="pages === 0 && loaded === true">
							<h1>Ничего не найдено</h1>
							<p>Ваш поисковой запрос не дал результатов. Пожалуйста, попробуйте еще раз.</p>
						</div>
						<div class="col-12 col-sm-12 col-sm-8 col-md-6 col-lg-4 col-xl-4" v-if="!loaded" v-for="cap in [1,2,3,4,5,6,7,8,9]" :key="cap">
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
						<infinite-loading @infinite="onInfinite" ref="infiniteLoading" class="news-preloader">
							<span slot="spinner">
								<div class="preloader-wrapper">
									<div class="rounded-preloader">
										<div class="pswp1">
											<div class="pswp2"></div>
										</div>
									</div>
								</div>
							</span>
							<span slot="no-more">Вы просмотрели все новости</span>
						</infinite-loading>
					</div>
				</div>
				<newsFilter :loaded="tagsLoaded" :tags="tags" :currentTag="currentTag" @startSearch="startSearch" @resetSearch="resetSearch" @selectTag="selectTag" @resetTag="resetTag"></newsFilter>
			</div>
		</div>
	</section>
</template>

<script>
import store from "../../store/";
import InfiniteLoading from "vue-infinite-loading";
import newsFilter from "./newsFilter";
export default {
	name: "NewsFeed",
	store,
	components: {
		InfiniteLoading,
		newsFilter
	},
	created() {
		this.$store.dispatch("NewsFeed/fetchEventsTags");
		this.$store.dispatch("NewsFeed/fetchAllEvents", 1);
	},
	methods: {
		startSearch(search) {
			this.$store.dispatch("NewsFeed/fetchEventsWithSearch", search);
		},
		resetSearch() {
			this.$store.commit("NewsFeed/resetSearch");
			this.$refs.infiniteLoading.stateChanger.reset();
			this.$store.dispatch("NewsFeed/fetchAllEvents", 1);
		},
		selectTag(tag) {
			this.$store.dispatch("NewsFeed/fetchEventsWithTag", tag);
		},
		resetTag() {
			this.$store.commit("NewsFeed/resetTag");
			this.$refs.infiniteLoading.stateChanger.reset();
			this.$store.dispatch("NewsFeed/fetchAllEvents", 1);
		},
		onInfinite() {
			this.$store.dispatch("NewsFeed/fetchInfiniteEvents");
		}
	},
	computed: {
		tagsLoaded() {
			return this.$store.state["NewsFeed"].tagsLoaded;
		},
		loaded() {
			return this.$store.state["NewsFeed"].loaded;
		},
		tags() {
			return this.$store.state["NewsFeed"].tags;
		},
		currentTag() {
			return this.$store.state["NewsFeed"].tag;
		},
		events() {
			return this.$store.state["NewsFeed"].events;
		},
		page() {
			return this.$store.state["NewsFeed"].page;
		},
		pages() {
			return this.$store.state["NewsFeed"].pages;
		}
	},
	watch: {
		loaded(state) {
			if (state === true) {
				this.$refs.infiniteLoading.stateChanger.loaded();
				if (this.page === this.pages || this.pages === 0) {
					this.$refs.infiniteLoading.stateChanger.complete();
				}
			}
		}
	}
};
</script>
