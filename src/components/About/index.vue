<template>
	<div>
		<div class="about-city-head-photo preloader" v-if="!loaded">
			<div class="about-city-heading-text">
				<div class="content-placeholder">
					<div class="container-loading h-line-1">
						<div class="line width-100"></div>
					</div>
					<div class="container-loading p-lines-18">
						<div class="line width-100"></div>
					</div>
				</div>
			</div>
			<div class="about-city-photo"></div>
		</div>
		<div class="about-city-head-photo" v-else>
			<div class="about-city-heading-text">
				<h1 v-html="city.acf.header"></h1>
				<p v-html="city.acf.subheader"></p>
			</div>
			<div class="about-city-photo" :style="{ 'background-image': 'url(' + city.acf.banner + ')' }"></div>
		</div>
		<section class="about-city-content">
			<div class="container">
				<div class="row">
					<div class="col-12 col-xl-9">
						<div class="wp-content-section">
							<div class="wp-content">
								<div class="content-placeholder" v-if="!loaded">
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
								</div>
								<div v-else>
									<div class="wp-heading">
										<h1 v-html="city.acf.header">Об округе</h1>
										<div class="subheading" v-html="city.acf.subheader"></div>
									</div>
									<div class="wp-text-container" v-html="city.content.rendered"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-xl-3"></div>
			</div>
		</section>
	</div>
</template>

<script>
import store from "../../store/";
export default {
	name: "About",
	store,
	data() {
		return {
			anchor: null
		};
	},
	created() {
		this.$store.dispatch("About/fetchCity");
	},
	computed: {
		loaded() {
			return this.$store.state["About"].loaded;
		},
		city() {
			return this.$store.state["About"].city;
		}
	},
	methods: {
		scrollToAnchor() {
			if (this.$route.hash !== "") {
				let anchor = document.querySelector(this.$route.hash);
				if (anchor !== null) {
					let anchorDistance = anchor.offsetTop + window.innerHeight;
					if (anchorDistance !== this.anchor) {
						this.anchor = anchorDistance;
						window.scrollTo(0, this.anchor);
						setTimeout(() => this.scrollToAnchor(), 1.5);
					}
				}
			}
		}
	},
	watch: {
		loaded(state) {
			if (state === true) {
				setTimeout(() => this.scrollToAnchor(), 1);
			}
		}
	}
};
</script>
