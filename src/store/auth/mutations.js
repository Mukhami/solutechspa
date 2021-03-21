import {date} from 'quasar'

export function setState(state, payload) {
  state.token = payload.token.access_token
  let now = new Date()
  state.expires_at = date.addToDate(now, {seconds: payload.token.expires_in})
  state.roles = payload.roles
  state.fname = payload.fname
}

export function clearState(state) {
  state.token = null
  state.expires_at = null
  state.roles = null
  state.fname = null
}

export function restoreState(state, payload) {
  Object.assign(state, payload)
}
