<template>
	<div>
		<Header mode="blue"></Header>
		<PrimaryMenu></PrimaryMenu>
		<PageHeading mode="blue" mainline="Форум" subline="Знакомьтесь с порталом, задавайте вопросы, делитесь впечатлениями"></PageHeading>
		<CityForum></CityForum>
		<ScrollTop></ScrollTop>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import PageHeading from "../components/PageHeading";
import CityForum from "../components/CityForum";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "ForumPage",
	components: {
		Header,
		PrimaryMenu,
		PageHeading,
		CityForum,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>