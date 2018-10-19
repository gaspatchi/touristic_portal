<template>
	<footer>
		<div :class="['cutblock',mode]"></div>
		<div class="container vcard">
			<div class="site-heading">
				<img class="city-logo" src="~@/assets/icons/the-city.svg">
				<div>
					<h1 class="category">Туристический портал</h1>
					<p class="fn org">Проект администрации Георгиевского городского округа</p>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-xl-4">
					<div class="contact-item">
						<h6 class="contact-name">Телефон для связи</h6>
						<h3 class="tel">+7 (87951) 3-55-87</h3>
					</div>
					<div class="contact-item">
						<h6 class="contact-name">Email для связи</h6>
						<h3 class="email">georg_kyltura@list.ru</h3>
					</div>
					<a href="http://gaspatchi.ru/" class="gaspatchi-logo">
						<div class="yellow-gradient"></div>
						<img src="~@/assets/icons/socail/created.svg">
					</a>
				</div>
				<div class="col-12 col-xl-4 site-map">
					<a href="http://stavtourism.ru/">Туристский информационный центр Ставропольского края</a>
					<a href="https://www.russiatourism.ru/">Федеральное агентство по туризму</a>
					<a href="http://www.georgievsk.ru/">Георгиевский городской округ</a>
				</div>
				<div class="col-12 col-xl-4 social-links">
					<a class="vk-icon" href="https://vk.com/georgievsk_ru">Вконтакте</a>
					<a class="ok-icon" href="https://ok.ru/vgeorgievske">Одноклассники</a>
					<a class="youtube-icon" href="https://www.youtube.com/channel/UChT_lGwdjJcSMCBetjGFNMw">Youtube</a>
					<a class="instagram-icon" href="https://www.instagram.com/georgievsk_ru">Instagram</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
	props: ["mode"]
};
</script>
