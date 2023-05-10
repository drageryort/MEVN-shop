import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTheMask from 'vue-the-mask'
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";

createApp(App).use(store).use(router).use(VueAxios, axios).use(VueTheMask).mount('#app');
