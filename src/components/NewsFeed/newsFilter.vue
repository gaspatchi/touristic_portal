<template>
	<div class="col-12 col-sm-9 col-md-10 col-lg-12 col-xl-3">
		<div :class="[{'active-search': searchActive || !loaded, 'xl-down-opend': !open},'news-filter']">
			<h5 data-click="open-news-filter" @click="toggle">Фильтр событий</h5>
			<div class="scroll-container">
				<div class="filter-category">
					<h6>Поиск события</h6>
					<div class="search-container">
						<input class="news-search" type="text" placeholder="Введите ключевые слова" v-model.trim="search">
						<div class="inactive-search-button" @click="resetSearch">✕</div>
					</div>
				</div>
				<div class="filter-category categories">
					<h6>Категории</h6>
					<div class="select-container">
						<div :class="[{'active': currentTag === null},'f-value']" @click="resetTag">Все</div>
						<div v-for="tag in tags" :key="tag.id" @click="selectTag(tag.id)" :class="[{'active': currentTag === tag.id},'f-value']">{{tag.name}}</div>
					</div>
				</div>
			</div>
			<div class="btn-close" @click="toggle">✕ Свернуть</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "newsFilter",
	props: ["loaded", "tags", "currentTag"],
	data() {
		return {
			open: true,
			search: ""
		};
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
		resetSearch() {
			this.search = "";
			this.$emit("resetSearch");
		},
		selectTag(id) {
			this.$emit("selectTag", id);
		},
		resetTag() {
			this.$emit("resetTag");
		}
	},
	computed: {
		searchActive() {
			return this.search.length > 0 ? true : false;
		}
	},
	watch: {
		search(state) {
			if (state.length > 0) {
				this.$emit("startSearch", state);
			} else {
				this.$emit("resetSearch");
			}
		}
	}
};
</script>
