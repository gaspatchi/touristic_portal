<template>
	<div class="comments-feed">
		<div class="no-comments" v-if="commentsEmpty">
			<h5>Будьте первым!</h5>
			<p>Похоже что еще никто не оставлял комментариев.</p>
		</div>
		<div class="the-comment" :id="comment.id" v-for="comment in comments" :key="comment.id" v-if="comment.parent === 0">
			<div class="avatar"></div>
			<div class="the-comment-content">
				<div>
					<h6 class="commentor-name" v-html="comment.author_name"></h6>
					<span class="date">{{comment.date | commentDate}}</span>
				</div>
				<div class="message">
					<div v-html="comment.content.rendered"></div>
					<media :images="comment.acf.comment_images" :media="comment.acf.comment_media"></media>
				</div>
				<div class="answers">
					<div>
						<div class="show-answers" v-if="checkAnswers(comment.id)">Ответы</div>
						<div class="answer-button" @click="answerComment(comment)">Ответить</div>
					</div>
					<div class="answers-feed">
						<div class="the-comment" :id="answer.id" v-for="answer in selectAnswers(comment.id)" :key="answer.id">
							<div class="avatar"></div>
							<div class="the-comment-content">
								<div>
									<h6 class="commentor-name" v-html="answer.author_name"></h6>
									<span class="date">{{answer.date | commentDate}}</span>
								</div>
								<div class="message">
									<div v-html="answer.content.rendered"></div>
									<media :images="answer.acf.comment_images" :media="answer.acf.comment_media"></media>
								</div>
								<div>
									<div class="show-answers" v-if="checkAnswers(answer.id)">Ответы</div>
									<div class="answer-button" @click="answerComment(answer)">Ответить</div>
								</div>
								<div class="answers-feed">
									<div class="the-comment" :id="answer.id" v-for="answer in selectAnswers(answer.id)" :key="answer.id">
										<div class="avatar"></div>
										<div class="the-comment-content">
											<div>
												<h6 class="commentor-name" v-html="answer.author_name"></h6>
												<span class="date">{{answer.date | commentDate}}</span>
											</div>
											<div class="message">
												<div v-html="answer.content.rendered"></div>
												<media :images="answer.acf.comment_images" :media="answer.acf.comment_media"></media>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import media from "./media";
export default {
	name: "CommentsFeed",
	props: ["comments", "loaded"],
	components: {
		media
	},
	data() {
		return {};
	},
	methods: {
		selectAnswers(comment) {
			return _.filter(this.$props.comments, { parent: comment });
		},
		checkAnswers(comment) {
			return this.selectAnswers(comment).length === 0 ? false : true;
		},
		answerComment(comment) {
			this.$emit("answerComment", comment);
		}
	},
	computed: {
		commentsEmpty() {
			return this.$props.comments.length === 0 && this.$props.loaded === true
				? true
				: false;
		}
	},
	filters: {
		commentDate(date) {
			moment.locale("ru");
			return moment(date).format("mm:HH, Do MMMM YYYY");
		}
	}
};
</script>
