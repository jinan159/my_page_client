import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// if (process.env.BASE_URL) Vue.prototype.$base_url = process.env.BASE_URL;
// else Vue.prototype.$base_url = 'http://localhost:3000/api';
Vue.prototype.$base_url = 'http://localhost:3000/api';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
