<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<PageHeading mainline="Георгиевск - моя крепость!" subline="Крепость «Георгиевск» основана в 1777 году, как одна из 10 крепостей Азово-Моздокской линии, которая сыграла важную роль в обеспечении безопасности южных границ Российской империи"></PageHeading>
		<IndexSlider></IndexSlider>
		<AboutHome></AboutHome>
		<HomeNews></HomeNews>
		<SocialActivity></SocialActivity>
		<Footer mode="yellow"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import PageHeading from "../components/PageHeading";
import IndexSlider from "../components/IndexSlider";
import AboutHome from "../components/AboutHome";
import HomeNews from "../components/HomeNews";
import SocialActivity from "../components/SocialActivity";
import Footer from "../components/Footer";

export default {
	name: "Index",
	components: {
		Header,
		PrimaryMenu,
		PageHeading,
		IndexSlider,
		AboutHome,
		HomeNews,
		SocialActivity,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
