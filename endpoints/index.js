import baseUrl from './baseUrl'
const authEndpoint = baseUrl + '/auth'
const register = `${authEndpoint}/register`
const forgotPassword = `${authEndpoint}/forgot-password`
const resetPassword = `${authEndpoint}/reset-password`
// const userEndpoint = baseUrl + '/users'
const cards = baseUrl + '/cards'
const denominations = baseUrl + '/denominations'
const transactions = baseUrl + '/transactions'
const wallet = baseUrl + '/wallet'
export default {
  register,
  forgotPassword,
  resetPassword,
  cards,
  denominations,
  transactions,
  wallet,
}
