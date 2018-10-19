<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<WrongUrl></WrongUrl>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import WrongUrl from "../components/WrongUrl";
import Footer from "../components/Footer";
export default {
	name: "NotFound",
	components: {
		Header,
		PrimaryMenu,
		WrongUrl,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
