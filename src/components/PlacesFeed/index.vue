<template>
	<section class="places-container">
		<div class="cutblock"></div>
		<div class="container sm-padding-none">
			<div class="the-category-places">
				<div class="places-heading">
					<h3 v-html="heading.name"></h3>
					<h6>{{heading.description|headingUpper}}</h6>
				</div>
				<div class="row">
					<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4" v-for="place in places" :key="place.id">
						<router-link :to="'/places/'+place.id" class="the-place">
							<div class="place-photo" :style="{ 'background-image': 'url(' + place.acf.place_image + ')' }"></div>
							<div class="description">
								<h5 v-html="place.acf.place_name"></h5>
								<div class="adress" v-if="place.acf.place_address" v-html="place.acf.place_address"></div>
								<div class="category-tags" v-if="place.acf.place_facts">
									<div v-for="(fact,index) in place.acf.place_facts" :key="index" v-html="fact.fact"></div>
								</div>
							</div>
						</router-link>
					</div>
					<div class="no-resultes" v-if="pages === 0 && loaded === true">
						<h1>Ничего не найдено</h1>
						<p>В данной категории ничего не обнаружено или информация еще не добавлена</p>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4" v-if="!loaded" v-for="cap in [1,2,3,4,5,6]" :key="cap">
						<a class="the-place">
							<div class="place-photo"></div>
							<div class="description">
								<div class="content-placeholder">
									<div class="container-loading h-line-3">
										<div class="line width-60"></div>
									</div>
									<div class="container-loading p-lines-16">
										<div class="line"></div>
										<div class="line width-40"></div>
									</div>
								</div>
							</div>
						</a>
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
				<span slot="no-more">Вы просмотрели все места</span>
			</infinite-loading>
		</div>
	</section>
</template>

<script>
import store from "../../store/";
import InfiniteLoading from "vue-infinite-loading";
import _ from "lodash";
export default {
	name: "PlacesFeed",
	store,
	components: {
		InfiniteLoading
	},
	created() {
		this.$store.dispatch("PlacesFeed/fetchPlacesCategories");
		this.currentCategory !== null
			? this.$store.dispatch("PlacesFeed/fetchPlacesCategory", this.currentCategory)
			: this.$store.dispatch("PlacesFeed/fetchAllPlaces", 1);
	},
	methods: {
		onInfinite() {
			if (this.page !== this.pages) {
				this.$store.dispatch("PlacesFeed/fetchInfinitePlaces", this.page + 1);
			}
		}
	},
	computed: {
		loaded() {
			return this.$store.state["PlacesFeed"].loaded;
		},
		placesCategories() {
			return this.$store.state["PlacesFeed"].categories;
		},
		currentCategory() {
			return this.$store.state["PlacesFeed"].category;
		},
		page() {
			return this.$store.state["PlacesFeed"].page;
		},
		pages() {
			return this.$store.state["PlacesFeed"].pages;
		},
		places() {
			return this.$store.state["PlacesFeed"].places;
		},
		heading() {
			if (this.currentCategory === null) {
				return {
					name: "Все места",
					description: _.map(_.slice(this.placesCategories, 0, 7), category =>
						category.name.toLowerCase()
					).join(", ")
				};
			} else {
				return _.find(this.placesCategories, { id: this.currentCategory });
			}
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
		},
		currentCategory() {
			this.$refs.infiniteLoading.stateChanger.reset();
		}
	},
	filters: {
		headingUpper(string) {
			string = string.toString();
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}
};
</script>
