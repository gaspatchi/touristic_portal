<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<PageHeading mainline="Места Георгиевского городского округа" subline=""></PageHeading>
		<PlacesFeed></PlacesFeed>
		<ScrollTop></ScrollTop>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import PageHeading from "../components/PageHeading";
import PlacesFeed from "../components/PlacesFeed";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "AllPlaces",
	components: {
		Header,
		PrimaryMenu,
		PageHeading,
		PlacesFeed,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
