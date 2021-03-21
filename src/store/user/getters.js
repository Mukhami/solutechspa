export function userId(state) {
  return state.user_id || localStorage.getItem('user_id')
}

export function affId(state) {
  return state.aff_id || localStorage.getItem('affiliate_id')
}

export function userToken(state) {
  return state.user_token || localStorage.getItem('user_token')
}

export function userCountryId(state) {

  return state.user_country_id || localStorage.getItem('user_country_id')

  // let countries = state.countries || JSON.parse(localStorage.getItem('countries'))
  // let user_country_id = state.user_country_id || localStorage.getItem('user_country_id')
  //
  // return countries.filter((c) => c.id == user_country_id)[0].id
}

export function userCountryFlag(state) {

  let countries = state.countries || JSON.parse(localStorage.getItem('countries'))
  let user_country_id = state.user_country_id || localStorage.getItem('user_country_id')

  return countries.filter((c) => c.id == user_country_id)[0].flag
}

export function userCountryCode(state) {

  let countries = state.countries || JSON.parse(localStorage.getItem('countries'))
  let user_country_id = state.user_country_id || localStorage.getItem('user_country_id')

  return countries.filter((c) => c.id == user_country_id)[0].country_code
}

export function countries(state) {
  return state.countries || JSON.parse(localStorage.getItem('countries'))
}

export function affToken(state) {
  return state.aff_token || localStorage.getItem('aff_token')
}
