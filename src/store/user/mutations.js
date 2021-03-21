/*
export function someMutation (state) {
}
*/

export function userId(state, user_id) {
  state.user_id = user_id
  localStorage.setItem('user_id', user_id)
}

export function affId(state, aff_id) {
  state.aff_id = aff_id
  localStorage.setItem('aff_id', aff_id)
}

export function userToken(state, user_token) {
  state.user_token = user_token
  localStorage.setItem('user_token', user_token)
}

export function userCountry(state, user_country_id) {
  state.user_country_id = user_country_id
  localStorage.setItem('user_country_id', user_country_id)
}

export function countries(state, countries) {
  state.countries = countries
  localStorage.setItem('countries', JSON.stringify(countries))
}

export function affToken(state, aff_token) {
  state.aff_token = aff_token
  localStorage.setItem('aff_token', aff_token)
}
