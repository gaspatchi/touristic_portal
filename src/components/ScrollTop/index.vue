<template>
    <button :class="[{'is-visible':show}, 'back-to-top-button']" @click="scroll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    </button>
</template>

<script>
export default {
	name: "ScrollTop",
	data() {
		return {
			show: false,
			percent: 0,
			position: 0
		};
	},
	created() {
		window.addEventListener("scroll", this.handleScroll);
		this.percent = window.innerHeight + window.innerHeight * 0.3;
	},
	methods: {
		handleScroll() {
			this.position = window.pageYOffset || document.documentElement.scrollTop;
			this.position >= this.percent ? (this.show = true) : (this.show = false);
		},
		scroll() {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
		}
	}
};
</script>
