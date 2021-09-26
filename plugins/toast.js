import Vue from 'vue'
import VueToastify from 'vue-toastify'
Vue.use(VueToastify, {
  backdrop: 'rgba(0, 0, 0, 0.2)',
  baseIconClass: '',
  canPause: true,
  canTimeout: true,
  defaultTitle: true,
  errorDuration: 3000,
  hideProgressbar: true,
  position: 'top-right',
  successDuration: 3000,
  theme: 'light',
  warningInfoDuration: 6000,
  withBackdrop: true,
})
