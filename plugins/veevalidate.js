import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import * as rules from 'vee-validate/dist/rules'
const paswwordRegEx =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/

//   ^	The password string will start this way
// (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
// (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
// (?=.*[0-9])	The string must contain at least 1 numeric character
// (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
// (?=.{8,})	The string must be eight characters or longer

// Replace "(?=.{8,12})" with ".{8,12}$" (remove the parentheses, question mark, and equals sign, add a dollar sign) to set min 8 & max 12

// https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

// Add a rule.
extend('strong', {
  validate: (value) => paswwordRegEx.test(value),
  message:
    'at least 1 lowercase, 1 uppercase, 1 number one special character and must be eight characters or longer is required',
})

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]) // eslint-disable-line
})

localize('en', en)

// Install components globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// plugins/bl-components.js

// import Vue from 'vue'
// import BlMain from '~components/frame/main/Main.vue'
// import BlRegion from '~components/frame/region/Region.vue'
// import BlLayout from '~components/frame/layout/Layout.vue'
// import BlGrid from '~components/frame/grid/Grid.vue'
// import BlColumn from '~components/frame/column/Column.vue'

// const components = { BlMain, BlRegion, ... }

// Object.entries(components).forEach(([name, component]) => {
//   Vue.component(name, component)
// })

// // nuxt.config.js
// export default {
//   plugins: ['~plugins/bl-components']
// }
