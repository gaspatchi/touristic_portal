<template>
	<div>
		<Header mode="blue"></Header>
		<PrimaryMenu></PrimaryMenu>
		<PageHeading mode="blue" mainline="Обратная связь" subline="Оставьте свое сообщение в этой форме, мы получим его на e-mail и обязательно ответим!"></PageHeading>
		<Feedback></Feedback>
		<Footer mode="grey"></Footer>
	</div>
</template>

<script>
import Header from "../components/Header";
import PrimaryMenu from "../components/PrimaryMenu";
import PageHeading from "../components/PageHeading";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
export default {
	name: "PostFeedback",
	components: {
		Header,
		PrimaryMenu,
		PageHeading,
		Feedback,
		Footer
	},
	created() {
		document.title = this.$route.meta.title;
	}
};
</script>
