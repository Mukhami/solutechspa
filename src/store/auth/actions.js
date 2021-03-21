import { LocalStorage } from 'quasar'

export function setState ({ commit, dispatch }, payload) {
  commit('setState', payload)
  dispatch('saveState')
}

export function saveState ({ state }) {
  try {
    LocalStorage.set(`${process.env.APP_MACHINE_NAME}-auth`, state)
  } catch (e) {
    console.log(e)
  }
}

export function clearState ({ state, commit }) {
  commit('clearState')
  LocalStorage.remove(`${process.env.APP_MACHINE_NAME}-auth`)
}

export function restoreState ({ commit, state }) {
  let auth = LocalStorage.getItem(`${process.env.APP_MACHINE_NAME}-auth`)
  if (auth && !state.token) {
    commit('restoreState', auth)
  }
}

export function tokenExpired ({ state }) {
  let now = new Date()
  return now > new Date(state.expires_at)
}

export function validToken ({ state, dispatch }) {
  let now = new Date()
  let expired = now > new Date(state.expires_at)
  return state.token && !expired
}
