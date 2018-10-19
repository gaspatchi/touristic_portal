<template>
	<section class="the-place-section">
		<div class="high-cutblock"></div>
		<div class="container sm-padding-none">
			<div class="wp-content-section">
				<div class="wp-content" v-if="!loaded">
					<div class="content-placeholder">
						<div class="container-loading h-line-1">
							<div class="line width-20"></div>
						</div>
					</div>
					<div class="in-place-slider">
						<div class="swiper-slide in-place-photo"></div>
					</div>
					<div class="the-place-info"></div>
					<div class="content-placeholder">
						<div class="container-loading h-line-1">
							<div class="line width-40"></div>
						</div>
						<div class="container-loading p-lines-18">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
						<div class="container-loading p-lines-18">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
					</div>
				</div>
				<div class="wp-content" v-else>
					<div class="wp-heading">
						<h1 v-html="place.acf.place_name"></h1>
					</div>
					<div class="wp-text-container">
						<div :class="[{'settings-popup-on': optionsOpen, 'view-cover': viewMode === 'cover', 'view-contain': viewMode === 'contain'},'in-place-slider view-mode']" v-if="place.acf.place_images">
							<swiper :options="SwiperOptions">
								<swiper-slide v-for="image in place.acf.place_images" :key="image.id" :style="{ 'background-image': 'url(' + image.url + ')' }" class="in-place-photo">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAGAQMAAAAv/Pa7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWPAAAAAEgABlEVF+wAAAABJRU5ErkJggg==">
								</swiper-slide>
								<div class="view-settings" slot="scrollbar">
									<div class="settings-icon icon" @click="toggleSettings"></div>
									<div class="settings-switches">
										<div class="description">Формат отображения</div>
										<div class="switches">
											<div :class="[{'is-active': viewMode === 'cover'},'item cover-setting']" @click="changeMode('cover')">
												<div class="cover icon"></div>
											</div>
											<div :class="[{'is-active': viewMode === 'contain'},'item contain-setting']" @click="changeMode('contain')">
												<div class="contain icon"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="swiper-button-next" slot="button-prev"></div>
								<div class="swiper-button-prev" slot="button-next"></div>
							</swiper>
						</div>
						<div class="the-place-info" v-if="place.acf.place_address || place.acf.place_phone || place.acf.place_hours">
							<div class="info-item" v-if="place.acf.place_address">
								<div class="place-icon adress-icon"></div>
								<div class="text-info">
									<b>Адрес:</b>
									<p v-html="place.acf.place_address"></p>
								</div>
							</div>
							<div class="info-item" v-if="place.acf.place_phone">
								<div class="place-icon phone-icon"></div>
								<div class="text-info">
									<b>Телефон:</b>
									<p v-html="place.acf.place_phone"></p>
								</div>
							</div>
							<div class="info-item" v-if="place.acf.place_hours">
								<div class="place-icon time-icon"></div>
								<div class="text-info">
									<b>Время работы:</b>
									<p v-html="place.acf.place_hours"></p>
								</div>
							</div>
						</div>
						<div v-html="place.acf.place_description"></div>
						<gmap-map v-if="place.acf.place_map" :center="marker" :zoom="14" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden;">
							<gmap-marker :position="marker" :draggable="true" :title="place.acf.place_name" :label="place.acf.place_name"></gmap-marker>
						</gmap-map>
					</div>
				</div>
			</div>
		</div>

	</section>

</template>

<script>
import store from "../../store/";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
	name: "CityPlace",
	store,
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			optionsOpen: false,
			viewMode: "cover",
			SwiperOptions: {
				loop: true,
				slidesPerView: "auto",
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			}
		};
	},
	created() {
		this.$store.dispatch("CityPlace/fetchPlace", this.$route.params.placeId);
	},
	methods: {
		toggleSettings() {
			this.optionsOpen = !this.optionsOpen;
		},
		changeMode(mode) {
			this.viewMode = mode;
			this.optionsOpen = false;
		}
	},
	computed: {
		loaded() {
			return this.$store.state["CityPlace"].loaded;
		},
		place() {
			return this.$store.state["CityPlace"].place;
		},
		marker() {
			return {
				lat: Number(this.place.acf.place_map.lat),
				lng: Number(this.place.acf.place_map.lng)
			};
		}
	},
	watch: {
		$route(to, from) {
			if (to.params.placeId !== from.params.placeId) {
				this.$store.dispatch(
					"CityPlace/fetchPlace",
					this.$route.params.placeId
				);
			}
		},
		loaded(state) {
			if (state === true) document.title = this.place.acf.place_name;
		}
	}
};
</script>
