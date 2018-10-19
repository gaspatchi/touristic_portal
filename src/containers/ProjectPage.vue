<template>
	<div>
		<Header mode="grey"></Header>
		<PrimaryMenu></PrimaryMenu>
		<CityProject></CityProject>
		<ScrollTop></ScrollTop>
		<Footer mode=""></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import CityProject from "../components/CityProject";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "ProjectPage",
	components: {
		Header,
		PrimaryMenu,
		CityProject,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
