<template>
	<section class="about-home-section">
		<div class="container">
			<h3 class="section-heading container">Факты об округе</h3>
			<div class="row">
				<div class="col-12 col-md-10 col-lg-6 fact-preloader" v-for="cap in [1,2,3,4,5,6]" :key="cap" v-if="!loaded">
					<div class="the-fact">
						<div class="icon">
						</div>
						<div class="about-fact">
							<div class="content-placeholder">
								<div class="container-loading h-line-1">
									<div class="line width-80"></div>
								</div>
								<div class="container-loading p-lines-18">
									<div class="line"></div>
									<div class="line"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-10 col-lg-6" v-for="fact in facts" :key="fact.id">
					<a :href="fact.acf.fact_link" class="border-fact" rel="noopener">
						<div class="the-fact">
							<div class="icon" :style="{ 'background-image': 'url(' + fact.acf.fact_icon + ')' }"></div>
							<div class="about-fact">
								<h3 v-html="fact.acf.fact_name"></h3>
								<p v-html="fact.acf.fact"></p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import store from "../../store/";
export default {
	name: "AboutHome",
	store,
	created() {
		this.$store.dispatch("AboutHome/fetchFacts");
	},
	computed: {
		loaded() {
			return this.$store.state["AboutHome"].loaded;
		},
		facts() {
			return this.$store.state["AboutHome"].facts;
		}
	}
};
</script>
