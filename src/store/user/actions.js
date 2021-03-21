/*
export function someAction (context) {
}
*/
//
// import axios_import from 'axios'
//
// const axios = axios_import.create({
//   baseURL: process.env.API_BASE_URL
// })

// import axios from '../../boot/axios'

export function accessToken({commit, getters}) {

  // the user already has all required values
  if (
    getters.userToken &&
    getters.userId &&
    getters.userCountryId
  ) {
    return
  }

  // the user does not have all required values
  axios({
      url: 'user/access_token',
      data: {user_id: getters.userId},
      method: 'POST'
    }
  )
    .then(resp => {

      let access_token, user_id, user_country_id = null

      if (resp.data) {

        access_token = resp.data.access_token
        user_id = resp.data.user_id
        user_country_id = resp.data.country_id

        commit('userToken', access_token)
        commit('userId', user_id)
        commit('userCountry', user_country_id)
      }
    })
    .catch(err => {
      commit('error', err)
    }).finally(() => {
  })
}

export function countries({commit, getters}) {

  if (getters.countries) {
    return
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${getters.affToken}`

  axios({url: 'countries', method: 'GET'})
    .then(resp => {
      commit('countries', resp.data)
    })
    .catch(err => {
      commit('error', err)
    }).finally(() => {
  })
}

export function updateUserCountry({commit, getters}, country_id) {
  commit('userCountry', country_id)

  axios.defaults.headers.common['Authorization'] = `Bearer ${getters.userToken}`

  axios({url: 'user/update-country', data: {country_id}, method: 'POST'})
    .then(resp => {
      resp
    })
    .catch(err => {
      commit('error', err)
    }).finally(() => {
  })
}

export function affToken({commit, getters}, aff_token) {
  if (getters.affToken) {
    return
  }
  commit('affToken', aff_token)
}

export function affId({commit, getters}, aff_id) {
  if (getters.affId) {
    return
  }
  commit('affId', aff_id)
}

