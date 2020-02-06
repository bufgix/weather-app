import Vue from 'vue'
import axios from 'axios'
import App from './App'
import Icon from "vue-awesome/icons"

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('Icon', Icon)
/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
