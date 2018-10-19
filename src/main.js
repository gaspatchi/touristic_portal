import Vue from "vue";
import App from "./app";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import * as VueGoogleMaps from "vue2-google-maps";
import { GOOGLE_MAPS_TOKEN } from "./store/services/config";
import VeeValidate, { Validator } from "vee-validate";
import ru from "vee-validate/dist/locale/ru";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();
Validator.localize("ru", ru);
Vue.use(VeeValidate, { locale: "ru" });
Vue.use(VueGoogleMaps, {
	load: {
		key: GOOGLE_MAPS_TOKEN,
		libraries: "places,visualization"
	}
});
sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	template: "<App/>",
	components: { App }
});
