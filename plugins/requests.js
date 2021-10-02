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

  // Inject $hello(msg) in Vue, context and store.
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
  })
}
