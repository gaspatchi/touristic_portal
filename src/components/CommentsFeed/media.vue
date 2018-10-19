<template>
	<div class="media-apps" v-if="!imagesEmpty">
		<div :class="[{'active':SwiperOpen},'media-slider']" :style="{ 'background-image': 'url(' + images[0].url + ')' }">
			<div class="slider-info" @click="toggleSwiper">
				<span>{{attachmentsLength}}</span>
			</div>
			<swiper :options="SwiperOptions" ref="commentsSwiper">
				<swiper-slide v-for="image in images" :key="image.id" :style="{ 'background-image': 'url(' + image.url + ')' }"></swiper-slide>
				<swiper-slide v-if="media" v-html="media"></swiper-slide>
				<div class="swiper-button-next" slot="button-prev"></div>
				<div class="swiper-button-prev" slot="button-next"></div>
				<div class="exit-button" @click="toggleSwiper" slot="scrollbar"></div>
			</swiper>
		</div>
	</div>
</template>

<script>
import _ from "lodash";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
	name: "media",
	props: ["images", "media"],
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			SwiperOpen: false,
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
	methods: {
		toggleSwiper() {
			this.SwiperOpen = !this.SwiperOpen;
			if (this.SwiperOpen === false) {
				this.$refs.commentsSwiper.swiper.slideTo(0);
			} else {
				setTimeout(() => this.$refs.commentsSwiper.swiper.update(), 1000);
			}
		}
	},
	computed: {
		imagesEmpty() {
			return _.size(this.$props.images) === 0 ? true : false;
		},
		attachmentsLength() {
			return _.size(this.$props.media) === 0
				? _.size(this.$props.images)
				: _.size(this.$props.images) + 1;
		}
	}
};
</script>
