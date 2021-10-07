import baseUrl from './baseUrl'
const authEndpoint = baseUrl + '/auth'
const register = `${authEndpoint}/register`
const sendVerifyEmail = `${authEndpoint}/send-verification-email`
const verifyEmail = `${authEndpoint}/verify-email`
const forgotPassword = `${authEndpoint}/forgot-password`
const resetPassword = `${authEndpoint}/reset-password`
const changePassword = `${authEndpoint}/update-password`
const users = baseUrl + '/users'
const cards = baseUrl + '/cards'
const denominations = baseUrl + '/denominations'
const transactions = baseUrl + '/transactions'
const wallet = baseUrl + '/wallet'
const payments = baseUrl + '/payments'
export default {
  register,
  forgotPassword,
  resetPassword,
  cards,
  denominations,
  transactions,
  wallet,
  payments,
  sendVerifyEmail,
  verifyEmail,
  users,
  changePassword,
}
