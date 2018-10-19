<template>
	<section class="social-activity">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-md-10 col-lg-8 col-xl-9">
					<div class="activity-content" v-if="!loaded">
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
					<div class="activity-content" v-else>
						<h2 v-html="project.acf.project_title"></h2>
						<p v-html="project.acf.project_summary"></p>
						<router-link v-if="project.acf.project_link" :to="'/projects/'+project.acf.project_link" class="more-info">Подробнее</router-link>
					</div>
				</div>
				<div class="col-11 col-md-10 col-lg-4 col-xl-3 social-project" v-if="!loaded">
					<div class="content-block">
						<div class="project-photo"></div>
						<div class="description">
							<div class="content-placeholder">
								<div class="container-loading p-lines-18">
									<div class="line width-40"></div>
									<div class="line"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-11 col-md-10 col-lg-4 col-xl-3 social-project" v-else>
					<div class="content-block">
						<div class="project-photo" :style="{ 'background-image': 'url(' + project.acf.project_image + ')' }"></div>
						<div class="description">
							<h5 v-html="project.acf.project_image_title"></h5>
							<p v-html="project.acf.project_image_description"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import store from "../../store/";
export default {
	name: "SocialActivity",
	store,
	created() {
		this.$store.dispatch("SocialActivity/fetchProject");
	},
	computed: {
		loaded() {
			return this.$store.state["SocialActivity"].loaded;
		},
		project() {
			return this.$store.state["SocialActivity"].project;
		}
	}
};
</script>
