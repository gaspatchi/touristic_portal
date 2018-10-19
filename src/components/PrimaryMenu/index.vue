<template>
	<div class="primary-menu">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="row">
						<div class="col-12 hidden-lg-up">
							<menu class="main-links ">
								<ul>
									<li>
										<router-link to="/" active-class="is-active" exact>Главная</router-link>
									</li>
									<li>
										<router-link to="/about" active-class="is-active" exact>Об округе</router-link>
									</li>
									<li>
										<router-link to="/events" active-class="is-active">События</router-link>
									</li>
									<li>
										<router-link to="/projects" active-class="is-active">Проекты</router-link>
									</li>
									<li>
										<router-link to="/places" active-class="is-active">Места</router-link>
									</li>
									<li>
										<router-link to="/forum" active-class="is-active">Форум</router-link>
									</li>
									<li>
										<router-link to="/feedback" active-class="is-active">Обратная связь</router-link>
									</li>
								</ul>
							</menu>
						</div>
						<div class="col-12 col-lg-4 col-xl-3">
							<div class="links-category">
								<div class="main-link">
									События
								</div>
								<div class="sub-links" v-if="loaded">
									<ul>
										<li v-for="event in events" :key="event.id">
											<router-link :to="'/events/' + event.id" v-html="event.acf.event_name" active-class="is-active"></router-link>
										</li>
									</ul>
								</div>
								<div class="content-placeholder" v-else>
									<div class="container-loading p-lines-22">
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-4 col-xl-3">
							<div class="links-category">
								<div class="main-link">
									Проекты
								</div>
								<div class="sub-links" v-if="loaded">
									<ul>
										<li v-for="project in projects" :key="project.id">
											<router-link :to="'/projects/' + project.id" v-html="project.acf.project_name" active-class="is-active"></router-link>
										</li>
									</ul>
								</div>
								<div class="content-placeholder" v-else>
									<div class="container-loading p-lines-22">
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-4 col-xl-3">
							<div class="links-category">
								<div class="main-link">
									Места
								</div>
								<div class="sub-links" v-if="loaded">
									<ul>
										<li v-for="place in places" :key="place.id">
											<router-link :to="'/places/' + place.id" v-html="place.acf.place_name" active-class="is-active"></router-link>
										</li>
									</ul>
								</div>
								<div class="content-placeholder" v-else>
									<div class="container-loading p-lines-22">
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
										<div class="line"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-4 col-xl-3">
							<div class="links-category">
								<div class="main-link">
									Соц. сети
								</div>
								<div class="sub-links social-links">
									<ul>

										<li>
											<a class="vk-icon" href="https://vk.com/georgievsk_ru">Вконтакте</a>
										</li>
										<li>
											<a class="ok-icon" href="https://ok.ru/vgeorgievske">Одноклассники</a>
										</li>
										<li>
											<a class="youtube-icon" href="https://www.youtube.com/channel/UChT_lGwdjJcSMCBetjGFNMw">Youtube</a>
										</li>
										<li>
											<a class="instagram-icon" href="https://www.instagram.com/georgievsk_ru">Instagram</a>
										</li>
									</ul>
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
import store from "../../store/";
export default {
	name: "PrimaryMenu",
	store,
	computed: {
		loaded() {
			return this.$store.state["PrimaryMenu"].loaded;
		},
		events() {
			return this.$store.state["PrimaryMenu"].events;
		},
		projects() {
			return this.$store.state["PrimaryMenu"].projects;
		},
		places() {
			return this.$store.state["PrimaryMenu"].places;
		},
		menuOpen() {
			return this.$store.state["PrimaryMenu"].open;
		}
	},
	destroyed() {
		this.$store.commit("PrimaryMenu/closeMenu");
		document.body.classList.remove("primary-menu-active");
	},
	watch: {
		$route() {
			this.$store.commit("PrimaryMenu/closeMenu");
			document.body.classList.remove("primary-menu-active");
		}
	}
};
</script>
