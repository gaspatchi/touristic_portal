<template>
	<div>
		<div class="the-project-head-photo" v-if="!loaded">
			<div class="project-heading-text">
				<div class="container ">
					<div class="row">
						<div class="col-12 col-xl-9">
							<div class="content-placeholder">
								<div class="container-loading h-line-1">
									<div class="line width-40"></div>
								</div>
								<div class="container-loading p-lines-22">
									<div class="line"></div>
									<div class="line"></div>
									<div class="line"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="the-project-head-photo" v-else>
			<div class="project-photo-img" :style="{ 'background-image': 'url(' + project.acf.thumbs_photo + ')' }"></div>
			<div class="project-heading-text">
				<div class="container ">
					<div class="row">
						<div class="col-12 col-xl-9">
							<h1 v-if="project.acf.project_name" v-html="project.acf.project_name"></h1>
							<p v-if="project.acf.project_summary" v-html="project.acf.project_summary"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<section class="the-project-content">
			<div class="container">
				<div class="row">
					<div class="col-12 col-xl-9">
						<div class="wp-content-section">
							<div class="wp-content" v-if="!loaded">
								<div class="wp-heading">
									<div class="content-placeholder">
										<div class="container-loading h-line-1">
											<div class="line width-40"></div>
										</div>
										<div class="container-loading p-lines-16">
											<div class="line width-20"></div>
										</div>
									</div>
								</div>
								<div class="wp-text-container">
									<div class="content-placeholder">
										<div class="container-loading p-lines-18">
											<div class="line"></div>
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
							<div class="wp-content" v-else>
								<div class="wp-heading">
									<h1>О проекте</h1>
								</div>
								<div class="wp-text-container" v-if="project.acf.project_description" v-html="project.acf.project_description"></div>
								<div class="project-docs" v-if="project.acf.project_documents">
									<div class="headline">
										<h3>Документы</h3>
									</div>
									<div class="docs-list">
										<ul>
											<li v-if="project.acf.project_documents" v-for="(document, index) in project.acf.project_documents" :key="index">
												<a :href="document.document" v-html="document.name" target="_blank"></a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-xl-3"></div>
				</div>
			</div>
			<div :class="[{'slider-active': SwiperOpen},'feautures-and-silder-wrapper']" v-if="loaded">
				<div class="container">
					<div class="row">
						<div class="col-12 col-xl-9">
							<div class="row justify-content-flex-end">
								<div class="col-12 col-xl-5 col-feautures">
									<div class="feauture-block">
										<div class="row">
											<div class="col-6 the-feauture" v-if="project.acf.project_facts" v-for="(fact,index) in project.acf.project_facts" :key="index">
												<div class="feauture-icon icon" :style="{ 'background-image': 'url(' + fact.fact_icon + ')' }"></div>
												<h6 v-html="fact.fact_name"></h6>
												<p v-html="fact.fact"></p>
											</div>
										</div>
									</div>
								</div>
								<div class="col-12 col-xl-7 col-sider">
									<div class="the-project slider">
										<div class="slider-blur-cover" @click="toggleSwiper">
											<div class="blur-img" v-if="project.acf.project_photos" :style="{ 'background-image': 'url(' + project.acf.project_photos[0].url + ')' }"></div>
										</div>

										<div :class="[{'settings-popup-on': optionsOpen, 'view-cover': viewMode === 'cover', 'view-contain': viewMode === 'contain'},'geo-slider desktop view-mode']" v-if="project.acf.project_photos" :style="{ 'background-image': 'url(' + project.acf.project_photos[0].url + ')' }">
											<swiper :options="SwiperOptions" ref="desktopSwiper">
												<swiper-slide v-for="image in project.acf.project_photos" :key="image.id" :style="{ 'background-image': 'url(' + image.url + ')' }"></swiper-slide>
												<div class="view-settings" slot="pagination">
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
												<div class="exit-button" @click="toggleSwiper" slot="scrollbar"></div>
											</swiper>
										</div>

										<div class="geo-slider mobile" v-if="project.acf.project_photos">
											<swiper :options="SwiperOptions" class="mobile-swiper">
												<swiper-slide v-for="image in project.acf.project_photos" :key="image.id" :style="{ 'background-image': 'url(' + image.url + ')' }"></swiper-slide>
												<div class="swiper-button-next" slot="button-prev"></div>
												<div class="swiper-button-prev" slot="button-next"></div>
											</swiper>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="comments" v-if="project.comment_status === 'open'">
			<div class="container">
				<div class="row">
					<div class="col-12 col-lg-8 col-xl-6">
						<div class="commnents-heading">
							<h2>Обсуждение проекта</h2>
						</div>
						<CommentsFeed :comments="comments" :loaded="commentsLoaded" @answerComment="changeAnswer"></CommentsFeed>
						<div class="get-more-container">
							<div class="btn centred-btn" @click="loadMore" v-if="showMore">Загрузить еще</div>
						</div>
						<CommentForm v-if="project.comment_status === 'open'" :full="false" :comment="answerComment" @clearAnswer="clearAnswer" @sendComment="sendComment"></CommentForm>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import store from "../../store/";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import CommentsFeed from "../CommentsFeed";
import CommentForm from "../CommentForm";
export default {
	name: "CityProject",
	store,
	components: {
		swiper,
		swiperSlide,
		CommentsFeed,
		CommentForm
	},
	data() {
		return {
			optionsOpen: false,
			viewMode: "cover",
			SwiperOpen: false,
			SwiperOptions: {
				loop: true,
				slidesPerView: "auto",
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			},
			answerComment: null
		};
	},
	created() {
		this.$store.dispatch(
			"CityProject/fetchProject",
			this.$route.params.projectId
		);
	},
	methods: {
		loadMore() {
			if (this.showMore) {
				this.$store.dispatch("CityProject/fetchComments", this.page + 1);
			}
		},
		changeAnswer(comment) {
			this.answerComment = comment;
		},
		clearAnswer() {
			this.answerComment = null;
		},
		sendComment(data) {
			this.$store.dispatch("PageHeading/showError", {
				style: "success",
				message: "Комментарий отправялется",
				time: 3
			});
			let formData = new FormData();
			formData.append("post", this.project.id);
			if (this.answerComment !== null) {
				formData.append("parent", this.answerComment.id);
			}
			formData.append("author_name", data.author);
			formData.append("author_email", data.email);
			formData.append("content", data.text);
			this.$store.dispatch("CityProject/sendComment", formData);
		},
		toggleSettings() {
			this.optionsOpen = !this.optionsOpen;
		},
		changeMode(mode) {
			this.viewMode = mode;
			this.optionsOpen = false;
		},
		toggleSwiper() {
			this.SwiperOpen = !this.SwiperOpen;
			if (this.SwiperOpen === false) {
				this.$refs.desktopSwiper.swiper.slideTo(0);
			} else {
				setTimeout(() => this.$refs.desktopSwiper.swiper.update(), 2000);
			}
		}
	},
	computed: {
		loaded() {
			return this.$store.state["CityProject"].loaded;
		},
		project() {
			return this.$store.state["CityProject"].project;
		},
		page() {
			return this.$store.state["CityProject"].page;
		},
		pages() {
			return this.$store.state["CityProject"].pages;
		},
		comments() {
			return this.$store.state["CityProject"].comments;
		},
		commentsLoaded() {
			return this.$store.state["CityProject"].commentsLoaded;
		},
		showMore() {
			return this.page !== this.pages && this.comments.length > 0
				? true
				: false;
		}
	},
	watch: {
		$route(to, from) {
			if (to.params.projectId !== from.params.projectId) {
				this.$store.dispatch(
					"CityProject/fetchProject",
					this.$route.params.projectId
				);
			}
		},
		loaded(state) {
			if (state === true) document.title = this.project.acf.project_name;
		}
	}
};
</script>
