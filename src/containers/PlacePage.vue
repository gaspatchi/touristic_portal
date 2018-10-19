<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<CityPlace></CityPlace>
		<ScrollTop></ScrollTop>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import CityPlace from "../components/CityPlace";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "ProjectPage",
	components: {
		Header,
		PrimaryMenu,
		CityPlace,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>