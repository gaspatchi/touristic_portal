<template>
	<div :class="['page-heading', mode]">
		<div :class="[{active: error}, style, 'main-alert']">{{message}}</div>
		<div class="container">
			<div class="wrapper">
				<h2 v-if="mainline">{{mainline}}</h2>
				<p v-if="subline">{{subline}}</p>
				<div class="places-filter" v-if="isPlaces">
					<div :class="[{'active': currentCategory === null},'p-value']" @click="changeCategory(null)">Все</div>
					<div :class="[{'active': category.id === currentCategory},'p-value']" v-for="category in placesCategories" :key="category.id" v-html="category.name" :title="category.description" @click="changeCategory(category.id)"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import store from "../../store/";
export default {
	name: "Page-heading",
	store,
	props: ["mode", "mainline", "subline"],
	methods: {
		changeCategory(category) {
			this.$store.dispatch("PlacesFeed/fetchPlacesCategory", category);
		}
	},
	computed: {
		error() {
			return this.$store.state["PageHeading"].error;
		},
		style() {
			return this.$store.state["PageHeading"].style;
		},
		message() {
			return this.$store.state["PageHeading"].message;
		},
		isPlaces() {
			return this.$route.path === "/places" ? true : false;
		},
		placesCategories() {
			return this.$store.state["PlacesFeed"].categories;
		},
		currentCategory() {
			return this.$store.state["PlacesFeed"].category;
		}
	}
};
</script>
