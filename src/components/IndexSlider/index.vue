<template>
	<div class="top-home slider">
		<div class="cutblock"></div>
		<swiper :options="SwiperOptions" v-show="!loaded">
			<swiper-slide class="swiper-slide col-10 col-lg-10 col-xl-7">
				<img class="img-raito h-33" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGAQMAAADAPp2FAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWPAAAAAEgABlEVF+wAAAABJRU5ErkJggg==">
				<img class="img-raito h-55" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHAQMAAADkoCUeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWPABgAAFQABR1OwYwAAAABJRU5ErkJggg==">
				<img class="img-raito h-50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAADAQMAAABh+Fe7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWMAAwAABgABxeOjcgAAAABJRU5ErkJggg==">
				<div class="slide-content">
					<div class="slide-content">
						<div class="content-placeholder">
							<div class="container-loading h-line-1">
								<div class="line width-40"></div>
								<div class="line width-80"></div>
							</div>
							<div class="container-loading p-lines-18">
								<div class="line"></div>
								<div class="line"></div>
								<div class="line"></div>
								<div class="line"></div>
								<div class="line"></div>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>

		<swiper :options="SwiperOptions" v-if="loaded">
			<swiper-slide class="swiper-slide col-10 col-lg-10 col-xl-7" :style="{ 'background-image': 'url(' + slide.acf.slider_image + ')' }" v-for="slide in slides" :key="slide.id">
				<img class="img-raito h-33" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGAQMAAADAPp2FAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWPAAAAAEgABlEVF+wAAAABJRU5ErkJggg==">
				<img class="img-raito h-55" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHAQMAAADkoCUeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWPABgAAFQABR1OwYwAAAABJRU5ErkJggg==">
				<img class="img-raito h-50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAADAQMAAABh+Fe7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUdwTIL60tIAAAABdFJOUwBA5thmAAAACklEQVQIHWMAAwAABgABxeOjcgAAAABJRU5ErkJggg==">
				<div class="slide-content">
					<h2 v-if="slide.acf.slider_title">{{slide.acf.slider_title}}</h2>
					<p v-if="slide.acf.slider_text">{{slide.acf.slider_text}}</p>
				</div>
				<a v-if="slide.acf.slider_link" :href="slide.acf.slider_link" rel="noopener">Подробнее</a>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import store from "../../store/";
export default {
	name: "IndexSlider",
	store,
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			SwiperOptions: {
				slidesPerView: "auto",
				centeredSlides: true,
				loop: true,
				slideToClickedSlide: true
			}
		};
	},
	created() {
		this.$store.dispatch("IndexSlider/fetchSlides");
	},
	computed: {
		slides() {
			return this.$store.state["IndexSlider"].slides;
		},
		loaded() {
			return this.$store.state["IndexSlider"].loaded;
		}
	}
};
</script>
