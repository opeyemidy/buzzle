import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import { iconsSet } from '~/assets/icons/icons'
import 'core-js/stable'
Vue.use(CoreuiVue)
const coreUiIcons = ({ app }) => {
  app.icons = iconsSet
}

export default coreUiIcons
