<template>
	<div>
		<div class="write-comment" v-if="!sended">
			<div class="commnents-heading">
				<h2>{{title}}
					<a :href="'#'+comment.id" v-if="comment" v-html="comment.author_name"></a>
					<div class="close-btn" v-if="comment" @click="clearAnswer">✕</div>
				</h2>
			</div>
			<div class="comment-inputs">
				<div id="form">
					<div class="row">
						<div class="col-12 col-md-6">
							<input :class="{'danger':errors.has('Email')}" v-validate="{ required: true, email: true }" v-model.trim="email" name="Email" placeholder="example@examle.com" type="email">
						</div>
						<div class="col-12 col-md-6">
							<input :class="{'danger':errors.has('Псевдоним')}" v-validate="{ required: true }" v-model.trim="author" name="Псевдоним" placeholder="Иванов Иван" type="text">
						</div>
						<div class="col-12">
							<div :class="[{'danger':errors.has('Текст')},'textarea-with-docs']">
								<textarea cols="30" rows="10" v-validate="{ required: true, min: 10 }" v-model="text" name="Текст" placeholder="Здраствуйте, меня зовут Иван и я хотел бы..."></textarea>
								<div class="attached-files" v-if="images.length > 0">
									<div class="file-item" v-for="(image, index) in images" :key="index">
										<div class="file-preview" :style="{ 'background-image': 'url(' + image.preview + ')' }"></div>
										<div class="delete-btn" @click="deleteImage(image)">×</div>
									</div>
								</div>
								<div class="attach-files" v-if="full">
									<div class="attach-btn">
										<div class="image-icon"></div>
										<input type="file" v-validate="{ required: false, image: true }" @change="addImages" accept="image/*" name="Изображение" title="Выбирать изображение" multiple>
									</div>
									<div class="attach-btn" title="Вставить ссылку на видео" @click="toggleMedia">
										<div class="video-icon"></div>
									</div>
									<div :class="[{'active': mediaOpen},'paste-video-popup']">
										<div class="video-link-wrapper">
											<div class="video-link-container">
												<h4>Прикрепить видео</h4>
												<p>Загрузите видео на один из популярных видео-хостингов и вставьте ссылку</p>
												<input :class="{'danger':errors.has('Видео')}" v-validate="{ required: false, url: true }" v-model.trim="media" name="Видео" placeholder="Вставьте ссылку на файл" type="url">
												<div class="btn" @click="toggleMedia">Добавить</div>
												<div class="btn grey" @click="toggleMedia">Отмена</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="personal-data">
					<p>Нажимая кнопку отправить Вы соглашаетесь с
						<a @click="togglePopup">политикой конфиденциальности персональных данных</a>
					</p>
				</div>
				<button class="btn" @click="sendComment">Отправить</button>
				<div :class="[{'active': popup},'wrapper-popup']">
					<div class="container">
						<div class="scroll-doc">
							<div class="wp-content">
								<Policy></Policy>
							</div>
						</div>
						<button class="send-button btn" @click="togglePopup">Закрыть</button>
					</div>
				</div>
			</div>
			<div v-for="(error, index) in errors.all()" :key="index" class="danger-messagse active" v-html="error"></div>
		</div>
		<div class="comment-sended" v-else>
			<h2>Комментарий отправлен</h2>
			<p>Благодарим за комментарий, он будет добавлен на сайт после прохождения модерации.</p>
			<button class="btn" @click="resetForm">Отправить ещё</button>
		</div>
	</div>
</template>

<script>
import _ from "lodash";
import Policy from "../Policy";
export default {
	name: "CommentForm",
	props: ["full", "comment"],
	components: {
		Policy
	},
	data() {
		return {
			popup: false,
			sended: false,
			email: "",
			author: "",
			text: "",
			images: [],
			media: "",
			mediaOpen: false
		};
	},
	methods: {
		togglePopup() {
			this.popup = !this.popup;
			document.body.classList.toggle("scroll-lock");
		},
		async sendComment() {
			let valid = await this.$validator.validateAll();
			if (valid) {
				this.$emit("sendComment", this.$data);
				this.sended = true;
			}
		},
		toggleMedia() {
			this.mediaOpen = !this.mediaOpen;
		},
		async addImages(images) {
			if ((await this.$validator.validate("Изображение")) === true) {
				let previewImages = [];
				for (let image of _.slice(images.target.files, 0, 3)) {
					let reader = new FileReader();
					reader.readAsDataURL(image);
					reader.onload = e => {
						image.preview = e.target.result;
						previewImages.push(image);
						this.images = previewImages;
					};
				}
			}
		},
		deleteImage(image) {
			this.images = _.reject(this.images, image);
		},
		clearAnswer() {
			this.$emit("clearAnswer");
		},
		resetForm() {
			this.sended = false;
			this.email = "";
			this.author = "";
			this.text = "";
			this.images = [];
			this.media = "";
			this.mediaOpen = false;
			this.$emit("clearAnswer");
		}
	},
	computed: {
		title() {
			if (this.$props.comment === null) {
				return "Оставить комментарий";
			} else {
				return "Ответить";
			}
		}
	}
};
</script>
