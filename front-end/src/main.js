import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import stratInfoData from '../src/data/stratInfoData.js'

let data = {
  stratInfoData: stratInfoData,
  guides: [],
  user: null
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
