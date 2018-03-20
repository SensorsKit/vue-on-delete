import Vue from 'vue'
import App from './App'
import VueOnDelete from '../src'

Vue.use(VueOnDelete)

new Vue({
  el: '#app',
  render: h => h(App)
})
