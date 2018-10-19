<template>
	<section class="feedback">
		<div class="cutblock"></div>
		<div class="container">
			<div class="wp-content-section">
				<div class="wp-content">
					<div class="wp-text-container">
						<div class="row">
							<div :class="[{'message': loaded},'col-12 col-xl-8 feedback-container']">
								<div class="feedback-form">
									<div class="row">
										<div class="col-12 col-lg-6">
											<h4>ФИО</h4>
											<input :class="{'danger':errors.has('ФИО')}" v-validate="{ required: true }" v-model.trim="fullname" name="ФИО" placeholder="Иванов Иван Иванович" type="text">
										</div>
										<div class="col-12 col-lg-6">
											<h4>Контактный email</h4>
											<input :class="{'danger':errors.has('Email')}" v-validate="{ required: true, email: true }" v-model.trim="email" name="Email" placeholder="example@example.com" type="email">
										</div>
										<div class="col-12 col-lg-6">
											<h4>Контактный телефон</h4>
											<input :class="{'danger':errors.has('Телефон')}" v-validate="{ required: false, max: 20 }" v-model.number="phone" name="Телефон" placeholder="Мобильный или городской" type="text">
										</div>
										<div class="col-12 col-lg-6">
											<h4>Тема</h4>
											<input :class="{'danger':errors.has('Тема')}" v-validate="{ required: true }" v-model.trim="subject" name="Тема" type="text" placeholder="Тема обращения">
										</div>
										<div class="col-12 col-lg-6">
											<h4>Файл</h4>
											<div :class="[{'hint-active': stage === 1,'paste-link-active': stage===2},'file-upload']">
												<input v-validate="{ required: false, url: true }" v-model.trim="link" name="Ссылка" placeholder="Вставьте ссылку на файл" type="url">
												<div class="context-message">
													<p class="hint-info">Загрузите ваши данные в один из облачных сервисов и скопируйте ссылку.</p>
													<button class="btn" @click="changeStage(2)">Далее</button>
												</div>
												<div class="upload-button" @click="changeStage(1)">Загрузить</div>
											</div>
										</div>
										<div class="col-12">
											<h4>Текст вашего сообщения</h4>
											<textarea v-validate="{ required: true, min: 10 }" v-model="text" name="Текст" placeholder="Здраствуйте, меня зовут Иван и я хотел бы..."></textarea>
										</div>
										<div class="col-12">
											<div class="personal-data">
												<p>Нажимая кнопку отправить Вы соглашаетесь с
													<a @click="togglePopup">политикой конфиденциальности персональных данных</a>
												</p>
											</div>
											<div class="personal-data">
												<button class="send-button btn" @click="sendFeedback">Отправить</button>
											</div>
										</div>
									</div>
									<div v-for="(error, index) in errors.all()" :key="index" class="danger-messagse active" v-html="error"></div>
								</div>
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
								<div class="feedback-sended">
									<h2>Благодарим за обращение</h2>
									<p>Благодарим Вас за обращение, для его рассмотрения нам понадобится какое-то время. Ответ будет отправлен на указанный Вами адрес электронной почты.</p>
								</div>
							</div>
							<div class="col-12 col-xl-4 contacts">
								<h1>Контакты</h1>
								<div class="contacts-data">
									<p>
										<b>Адрес: </b> г. Георгиевск, ул. Чугурина 12/46
									</p>
									<p>
										<b>Телефон:</b> 8 (87951) 3-55-27 </p>
									<p>
										<b>Факс:</b> 8 (87951) 3-55-64
									</p>
									<p>
										<b>Электронная почта:</b> georg_kyltura@list.ru
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

</template>

<script>
import store from "../../store/";
import Policy from "../Policy";
export default {
	name: "Feedback",
	store,
	components: {
		Policy
	},
	data() {
		return {
			popup: false,
			stage: null,
			fullname: null,
			email: null,
			phone: null,
			subject: null,
			text: null,
			link: null
		};
	},
	methods: {
		changeStage(stage) {
			this.stage = stage;
		},
		togglePopup() {
			this.popup = !this.popup;
			document.body.classList.toggle("scroll-lock");
		},
		async sendFeedback() {
			let valid = await this.$validator.validateAll();
			if (valid) {
				this.$store.dispatch("Feedback/postFeedback", {
					fullname: this.fullname,
					email: this.email,
					phone: this.phone,
					subject: this.subject,
					text: this.text,
					link: this.link
				});
			}
		}
	},
	computed: {
		loaded() {
			return this.$store.state["Feedback"].loaded;
		}
	}
};
</script>
