import endpoints from '~/endpoints'
// export default function ({ $axios, redirect }) {
//   $axios.onError((error) => {
//     if (error.response.status === 500) {
//       redirect('/sorry')
//     }
//   })
// }
export default ({ app, $axios, redirect }, inject) => {
  const setMultipartData = () => {
    return $axios.setHeader('Content-Type', 'multipart/form-data')
  }

  const cardEndpoint = endpoints.cards
  const transactionsEndpoint = endpoints.transactions
  const walletEndpoint = endpoints.wallet

  const register = async (data) => await $axios.$post(endpoints.register, data)
  const forgotPassword = async (data) =>
    await $axios.$post(endpoints.forgotPassword, data)
  const resetPassword = async (token, data) =>
    await $axios.$post(`${endpoints.resetPassword}?token=${token}`, data)
  const createCard = async (data) => {
    return await $axios.$post(cardEndpoint, data)
  }
  const getCards = async (query = {}) => {
    const { page, limit } = query
    let data = `?limit=${limit || 10}`
    if (page) data = `${data}&page=${page}`
    if (Object.keys(query).length === 0) data = ''
    return await $axios.$get(cardEndpoint + data)
  }
  const getCard = async (id) => await $axios.$get(cardEndpoint + '/' + id)
  const updateCard = async (id, data) => {
    setMultipartData()
    return await $axios.$patch(cardEndpoint + '/' + id, data)
  }
  const createTransaction = async (data) => {
    return await $axios.$post(transactionsEndpoint, data)
  }
  const getTransactions = async (query = {}) => {
    const { page, limit } = query
    let data = `?limit=${limit || 20}`
    if (page) data = `${data}&page=${page}`
    if (Object.keys(query).length === 0) data = ''
    return await $axios.$get(transactionsEndpoint + data)
  }
  const getWallet = async (id) => {
    return await $axios.$get(walletEndpoint + '/' + id)
  }
  const setPin = async (data) => {
    return await $axios.$post(walletEndpoint + '/pin', data)
  }
  const addAccount = async (data) => {
    return await $axios.$post(walletEndpoint + '/account', data)
  }
  const setDefaultAccount = async (accountNumber, data) => {
    return await $axios.$patch(
      walletEndpoint + '/account/' + accountNumber,
      data
    )
  }
  const deleteAccount = async (accountNumber, data) => {
    return await $axios.$delete(walletEndpoint + '/account/' + accountNumber, {
      data,
    })
  }
  inject('request', {
    register,
    forgotPassword,
    resetPassword,
    createCard,
    getCards,
    getCard,
    updateCard,
    createTransaction,
    getTransactions,
    getWallet,
    setPin,
    addAccount,
    setDefaultAccount,
    deleteAccount,
  })
}
