import Vue from 'vue'

import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/main.css'
import VueHtmlToPaper from 'vue-html-to-paper';
import VueProgressBar from 'vue-progressbar';


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueHtmlToPaper,{
  "name": "_blank",
  "specs": [
    "fullscreen=yes",
    "titlebar=yes",
    "scrollbars=no"
  ],
  "styles": [
    // "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "../src/assets/main.css",
  ],
  "timeout": 1000,
  "autoClose": true,
  "windowTitle": "Vue Html To Paper - Vue mixin for html elements printing."
});

const options = {
  color: '#18d94b',
  failedColor: '#18d94b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
} 
Vue.use(VueProgressBar, options)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
