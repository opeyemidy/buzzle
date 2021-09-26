// export default function ({ $axios, redirect }) {
//   $axios.onError((error) => {
//     if (error.response.status === 500) {
//       redirect('/sorry')
//     }
//   })
// }
import endpoints from '~/endpoints'
export default ({ app, $axios, redirect }, inject) => {
  const forgotPassword = async (data) =>
    await $axios.$post(endpoints.forgotPassword, data)
  const resetPassword = async (token, data) =>
    await $axios.$post(`${endpoints.resetPassword}?token=${token}`, data)
  const createCard = async (data) => {
    return await $axios.$post(endpoints.card, data)
  }
  const getCards = async (query = {}) => {
    const { page, limit } = query
    let data = `?limit=${limit || 10}`
    if (page) data = `${data}&page=${page}`
    if (Object.keys(query).length === 0) data = ''
    return await $axios.$get(endpoints.card + data)
  }
  const getCard = async (id) => await $axios.$get(endpoints.card + '/' + id)
  const updateCard = async (id, data) => {
    await $axios.setHeader('Content-Type', 'multipart/form-data')
    return await $axios.$patch(endpoints.card + '/' + id, data)
  }
  const addDenomination = async (data) => {
    return await $axios.$post(endpoints.denominations, data)
  }
  const updateDenomination = async (id, data) => {
    return await $axios.$patch(endpoints.denominations + '/' + id, data)
  }
  const deleteDenomination = async (id) => {
    return await $axios.$delete(endpoints.denominations + '/' + id)
  }

  // Inject $hello(msg) in Vue, context and store.
  inject('request', {
    forgotPassword,
    resetPassword,
    createCard,
    getCards,
    getCard,
    updateCard,
    addDenomination,
    updateDenomination,
    deleteDenomination,
  })
}
