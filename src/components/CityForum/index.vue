<template>
	<section class="forum">
		<div class="cutblock"></div>
		<div class="container forum-content-section">
			<div class="row row-out">
				<div class="row-out col-12 col-xl-3">
					<div class="list-heading">
						Тема:
					</div>
					<div :class="[{'xl-down-active':mobileOpen},'discussion-topic-list']" @click="toggleCategories">
						<div :class="[{'active': theme.id === currentTheme.id},'item']" id="fst-btn" @click="changeTheme(theme.id)" v-for="theme in themes" :key="theme.id" v-html="theme.acf.short_name"></div>
					</div>
				</div>
				<div class="row-out col-12 col-xl-9">
					<div class="the-discussion active" id="about-all">
						<div class="wp-content" v-if="!loaded">
							<div class="content-placeholder">
								<div class="container-loading h-line-1">
									<div class="line width-40"></div>
								</div>
								<div class="container-loading p-lines-18">
									<div class="line"></div>
									<div class="line"></div>
									<div class="line"></div>
								</div>
							</div>
						</div>
						<div class="wp-content" v-else>
							<h1 v-html="currentTheme.acf.full_name"></h1>
							<p v-html="currentTheme.acf.theme_description"></p>
						</div>
						<div class="comments">
							<div class="commnents-heading">
								<h2>Обсуждение темы</h2>
							</div>
							<CommentsFeed :comments="comments" :loaded="commentsLoaded" @answerComment="changeAnswer"></CommentsFeed>
							<div class="get-more-container">
								<div class="btn centred-btn" @click="loadMore" v-if="showMore">Загрузить еще</div>
							</div>
							<CommentForm v-if="currentTheme.comment_status === 'open'" :full="true" :comment="answerComment" @clearAnswer="clearAnswer" @sendComment="sendComment"></CommentForm>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import store from "../../store/";
import CommentsFeed from "../CommentsFeed";
import CommentForm from "../CommentForm";
export default {
	name: "CityForum",
	store,
	components: {
		CommentsFeed,
		CommentForm
	},
	data() {
		return {
			mobileOpen: false,
			answerComment: null
		};
	},
	created() {
		this.$store.dispatch("CityForum/fetchThemes");
	},
	methods: {
		toggleCategories() {
			this.mobileOpen = !this.mobileOpen;
		},
		changeTheme(theme) {
			this.$store.dispatch("CityForum/changeTheme", theme);
		},
		loadMore() {
			if (this.showMore) {
				this.$store.dispatch("CityForum/fetchComments", this.page + 1);
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
			formData.append("post", this.currentTheme.id);
			if (this.answerComment !== null) {
				formData.append("parent", this.answerComment.id);
			}
			formData.append("author_name", data.author);
			formData.append("author_email", data.email);
			formData.append("content", data.text);
			formData.append("comment_media", data.media);
			for (const image of data.images) {
				formData.append("comment_images[]", image);
			}
			this.$store.dispatch("CityForum/sendComment", formData);
		}
	},
	computed: {
		loaded() {
			return this.$store.state["CityForum"].loaded;
		},
		page() {
			return this.$store.state["CityForum"].page;
		},
		pages() {
			return this.$store.state["CityForum"].pages;
		},
		themes() {
			return this.$store.state["CityForum"].themes;
		},
		currentTheme() {
			return this.$store.state["CityForum"].theme;
		},
		comments() {
			return this.$store.state["CityForum"].comments;
		},
		commentsLoaded() {
			return this.$store.state["CityForum"].commentsLoaded;
		},
		showMore() {
			return this.page !== this.pages && this.comments.length > 0
				? true
				: false;
		}
	}
};
</script>
