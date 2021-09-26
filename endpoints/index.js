import baseUrl from './baseUrl'
const authEndpoint = baseUrl + '/auth'
// const userEndpoint = baseUrl + '/users'
const card = baseUrl + '/cards'
const denominations = baseUrl + '/denominations'
const forgotPassword = `${authEndpoint}/forgot-password`
const resetPassword = `${authEndpoint}/reset-password`
export default {
  forgotPassword,
  resetPassword,
  card,
  denominations,
}
