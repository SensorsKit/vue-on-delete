import Vue from 'vue'
import App from './App'
import VueOnDelete from '../src/index'

const hostname = window.location.hostname

if (
  hostname === 'localhost' ||
  !Number.isNaN(Number(hostname.split('.').join('')))
) {
  import('vconsole').then(result => {
    const VConsole = result.default
    /* eslint-disable no-new */
    new VConsole()
  })
}

Vue.use(VueOnDelete)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
