<template>
	<section class="not-a-found-page">
		<div class="high-cutblock"></div>
		<div class="container sm-padding-none">
			<div class="wp-content-section">
				<div class="not-a-found-messege">
					<div class="heading">404</div>
					<p>Страница не найдена</p>
					<router-link to="/" class="btn">На главную</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "WrongUrl"
};
</script>
