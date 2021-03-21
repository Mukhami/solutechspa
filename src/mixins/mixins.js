import { LocalStorage } from 'quasar'
import {mapActions, mapGetters} from 'vuex'

export const defaultMixin = {
  methods: {
    ...mapActions('auth', ['restoreState']),

    axiosAuth () {
      if (LocalStorage.getItem(`${process.env.APP_MACHINE_NAME}-auth`)) {
        let token = LocalStorage.getItem(`${process.env.APP_MACHINE_NAME}-auth`).token
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      }
    }
  },

  computed: {
    ...mapGetters('auth', ['fName']),
    appName () {
      return process.env.APP_NAME
    }
  },

  created () {
    this.axiosAuth()
    // if the browser has been reloaded, restore application state from localstorage
    this.restoreState()
  },
}

export const myLoading = {
  methods: {
    loadingShow (component) {
      this[component].loading = true
    },
    loadingHide (component) {
      this[component].loading = false
    }
  }
}
