<template>
	<div>
		<Header mode="green"></Header>
		<PrimaryMenu></PrimaryMenu>
		<PageHeading mainline="Георгиевский округ - территория перспектив!" subline="В округе реализуется ряд проектов, направленных на благоустройство, создание комфортной городской среды, развитие инфраструктуры, и заботу о жителях."></PageHeading>
		<ProjectsFeed></ProjectsFeed>
		<ScrollTop></ScrollTop>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import PageHeading from "../components/PageHeading";
import ProjectsFeed from "../components/ProjectsFeed";
import ScrollTop from "../components/ScrollTop";
import Footer from "../components/Footer";
export default {
	name: "AllEvents",
	components: {
		Header,
		PrimaryMenu,
		PageHeading,
		ProjectsFeed,
		ScrollTop,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
