<template>
	<section class="all-projects">
		<div class="cutblock"></div>
		<div class="container">
			<div class="the-project" v-for="project in projects" :key="project.id">
				<div class="row">
					<div class="col-12 col-lg-4 col-xl-4 p-review">
						<swiper :options="SwiperOptions">
							<swiper-slide class="swiper-slide project-photo" :style="{ 'background-image': 'url(' + slide.url + ')' }" v-for="slide in project.acf.preview_images" :key="slide.id"></swiper-slide>
						</swiper>
					</div>
					<div class="col-12 col-lg-8 col-xl-8 project-about">
						<h2 v-if="project.acf.project_name" v-html="project.acf.project_name"> </h2>
						<div class="project-features" v-if="project.acf.preview_facts">
							<div class="the-future" v-for="(fact, index) in project.acf.preview_facts" :key="index">
								<h6 v-html="fact.fact_name"></h6>
								<p v-html="fact.fact"></p>
							</div>
						</div>
						<div class="description" v-if="project.acf.project_summary" v-html="project.acf.project_summary"></div>
						<router-link :to="'/projects/'+project.id" class="get-more-button">
							Подробнее
							<div class="icon right-arrow"></div>
						</router-link>
					</div>
				</div>
			</div>
			<div class="the-project" v-if="!loaded" v-for="cap in [1,2,3,4]" :key="cap">
				<div class="row">
					<div class="col-12 col-lg-4 col-xl-4 p-review">
						<div class="project-photo"></div>
					</div>
					<div class="col-12 col-lg-8 col-xl-8 project-about">
						<div class="content-placeholder">
							<div class="container-loading h-line-1">
								<div class="line width-40"></div>
							</div>
						</div>
						<div class="description">
							<div class="content-placeholder">
								<div class="container-loading p-lines-18">
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
				<span slot="no-more">Вы просмотрели все проекты</span>
			</infinite-loading>
		</div>
	</section>

</template>

<script>
import store from "../../store/";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import InfiniteLoading from "vue-infinite-loading";
export default {
	name: "ProjectsFeed",
	store,
	components: {
		swiper,
		swiperSlide,
		InfiniteLoading
	},
	data() {
		return {
			SwiperOptions: {
				loop: true,
				autoplay: {
					delay: 2500
				}
			}
		};
	},
	created() {
		this.$store.dispatch("ProjectsFeed/fetchAllProjects", 1);
	},
	methods: {
		onInfinite() {
			if (this.page !== this.pages) {
				this.$store.dispatch("ProjectsFeed/fetchAllProjects", this.page + 1);
			}
		}
	},
	computed: {
		loaded() {
			return this.$store.state["ProjectsFeed"].loaded;
		},
		projects() {
			return this.$store.state["ProjectsFeed"].projects;
		},
		page() {
			return this.$store.state["ProjectsFeed"].page;
		},
		pages() {
			return this.$store.state["ProjectsFeed"].pages;
		}
	},
	watch: {
		loaded(state) {
			if (state === true) {
				this.$refs.infiniteLoading.stateChanger.loaded();
				if (this.page === this.pages) {
					this.$refs.infiniteLoading.stateChanger.complete();
				}
			}
		}
	}
};
</script>
