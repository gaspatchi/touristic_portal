<template>
	<header :class="['header',mode]">
		<div class="container">
			<div class="left-part">
				<div :class="[{'open': menuOpen},'humburger-menu']" @click="toggleMenu">
					<div class="line-menu half start"></div>
					<div class="line-menu"></div>
					<div class="line-menu half end"></div>
				</div>
				<div class="vim icon" @click="toggleVim"></div>
				<div class="vim-settings">
					<div class="v-heading-1">Настройки для людей с нарушениями зрения</div>
					<div class="vim-category">
						<div class="category-name">Размер текста</div>
						<div class="switches" data-click="f-sizes">
							<div class="item t-small-size" @click="setSize('small')">A</div>
							<div class="item t-medium-size" @click="setSize('medium')">A</div>
							<div class="item t-large-size" @click="setSize('large')">A</div>
						</div>
					</div>
					<div class="vim-category">
						<div class="category-name">Цветовая схема</div>
						<div class="switches">
							<div class="item fst-color" @click="setScheme('white')">Белый</div>
							<div class="item scd-color" @click="setScheme('black')">Черный</div>
						</div>
					</div>
					<div class="vim-category">
						<div class="category-name">Изображения</div>
						<div class="switches">
							<div class="item turn-on" @click="setImages('enabled')">Вкл.</div>
							<div class="item turn-off" @click="setImages('disabled')">Выкл.</div>
						</div>
					</div>
					<div class="v-footer">
						<div class="btn reset" @click="resetVim">Сброс</div>
						<div class="btn close" @click="closeVim">Закрыть</div>
					</div>
				</div>
			</div>
			<div class="right-part">
				<menu class="links hidden-md-down">
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
		</div>
	</header>
</template>

<script>
import store from "../../store/";
export default {
	name: "Header",
	props: ["mode"],
	store,
	data() {
		return {
			open: false,
			size: 1,
			scheme: 1,
			images: "enabled"
		};
	},
	created() {
		this.size = localStorage.getItem("size");
		this.scheme = localStorage.getItem("scheme");
		let images = localStorage.getItem("images");
		if (images === null) {
			this.images = "enabled";
		} else if (images === "disabled") {
			this.images = "disabled";
		}
	},
	methods: {
		toggleVim() {
			this.open = !this.open;
		},
		setSize(size) {
			this.size === size
				? ((this.size = "default"), localStorage.setItem("size", "default"))
				: ((this.size = size), localStorage.setItem("size", size));
		},
		setScheme(scheme) {
			this.scheme === scheme
				? ((this.scheme = "default"), localStorage.setItem("scheme", "default"))
				: ((this.scheme = scheme), localStorage.setItem("scheme", scheme));
		},
		setImages(images) {
			this.images = images;
			localStorage.setItem("images", images);
		},
		closeVim() {
			this.open = false;
		},
		resetVim() {
			this.size = "default";
			this.scheme = "default";
			this.images = "enabled";
			localStorage.setItem("size", "default");
			localStorage.setItem("scheme", "default");
			localStorage.setItem("images", "enabled");
		},
		toggleMenu() {
			if (this.menuOpen === false) {
				this.$store.commit("PrimaryMenu/openMenu");
				this.$store.dispatch("PrimaryMenu/fetchLinks");
				document.body.classList.add("primary-menu-active");
			} else {
				this.$store.commit("PrimaryMenu/closeMenu");
				document.body.classList.remove("primary-menu-active");
			}
		}
	},
	computed: {
		menuOpen() {
			return this.$store.state["PrimaryMenu"].open;
		}
	},
	watch: {
		open(state) {
			if (state === true) {
				document.body.classList.add("vim-windows-on");
			} else {
				document.body.classList.remove("vim-windows-on");
			}
		},
		size(size) {
			switch (size) {
				case null:
				case "default":
					document.body.classList.remove("vim-t-s-small");
					document.body.classList.remove("vim-t-s-medium");
					document.body.classList.remove("vim-t-s-large");
					break;
				case "small":
					document.body.classList.remove("vim-t-s-medium");
					document.body.classList.remove("vim-t-s-large");
					document.body.classList.add("vim-t-s-small");
					break;
				case "medium":
					document.body.classList.remove("vim-t-s-small");
					document.body.classList.remove("vim-t-s-large");
					document.body.classList.add("vim-t-s-medium");
					break;
				case "large":
					document.body.classList.remove("vim-t-s-small");
					document.body.classList.remove("vim-t-s-medium");
					document.body.classList.add("vim-t-s-large");
					break;
			}
		},
		scheme(scheme) {
			switch (scheme) {
				case null:
				case "default":
					document.body.classList.remove("vim-bg-white");
					document.body.classList.remove("vim-bg-black");
					break;
				case "white":
					document.body.classList.remove("vim-bg-black");
					document.body.classList.add("vim-bg-white");
					break;
				case "black":
					document.body.classList.remove("vim-bg-white");
					document.body.classList.add("vim-bg-black");
					break;
			}
		},
		images(state) {
			if (state === "enabled") {
				document.body.classList.remove("vim-img-hide");
			} else if (state === "disabled") {
				document.body.classList.add("vim-img-hide");
			}
		}
	}
};
</script>
