import { iconsSet as icons } from '~/assets/icons/icons.js'
export default ({ app }, inject) => {
  inject('icons', () => icons)
}
