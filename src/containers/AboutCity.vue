<template>
	<div>
		<Header mode="grey"></Header>
		<PrimaryMenu></PrimaryMenu>
		<About></About>
		<ScrollTop></ScrollTop>
		<Footer mode="white"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import About from "../components/About";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "AboutCity",
	components: {
		Header,
		PrimaryMenu,
		About,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
