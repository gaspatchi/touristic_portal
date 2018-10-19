<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<PageHeading mainline="Георгиевск – центр Кавказской Губернии!" subline="Георгиевск с 1786 года - центр Кавказской Губернии, место проведения крупнейших ярмарок на Северном Кавказе, центр шёлковой промышленности"></PageHeading>
		<NewsFeed></NewsFeed>
		<ScrollTop></ScrollTop>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import PageHeading from "../components/PageHeading";
import NewsFeed from "../components/NewsFeed";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "AllEvents",
	components: {
		Header,
		PrimaryMenu,
		PageHeading,
		NewsFeed,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
