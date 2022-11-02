import { createApp } from 'vue';
import VueCookies from 'vue3-cookies';
import { init } from 'emailjs-com';
import App from './App.vue';
import router from './router';
import store from './store';
import '../public/style.css';
import "vue-select/src/scss/vue-select.scss";

init("user_fGZE9CDoa1kR6f5xei3V1");


const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueCookies)
  .mount('#app');

export default app;
