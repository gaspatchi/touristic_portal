<template>
	<div class="col-12 col-xl-3">
		<div class="last-news-widget">
			<h4>Последние события</h4>
			<div class="last-news-list" v-if="!loaded">
				<a class="item">
					<div class="content-placeholder">
						<div class="container-loading h-line-3">
							<div class="line width-40"></div>
						</div>
						<div class="container-loading p-lines-14">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
					</div>
				</a>
				<a class="item">
					<div class="content-placeholder">
						<div class="container-loading h-line-3">
							<div class="line width-40"></div>
						</div>
						<div class="container-loading p-lines-14">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
					</div>
				</a>
			</div>
			<div class="last-news-list" v-else>
				<router-link v-for="event in events" :key="event.id" :to="'/events/'+event.id" class="item">
					<h5 v-if="event.acf.event_name" v-html="event.acf.event_name"></h5>
					<p v-if="event.acf.event_summary" v-html="event.acf.event_summary"></p>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "lastEvents",
	props: ["loaded", "events"]
};
</script>
