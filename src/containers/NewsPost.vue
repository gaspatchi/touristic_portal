<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<EventPost></EventPost>
		<ScrollTop></ScrollTop>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import EventPost from "../components/EventPost";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "NewsPost",
	components: {
		Header,
		PrimaryMenu,
		EventPost,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
