<template>
  <q-layout
    view="hHh lpR fFf"
    class="bg-grey-1"
  >
    <q-header
      bordered
      class="bg-white text-grey-8 q-py-xs"
      height-hint="58"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <a href="#/" style="text-decoration: none" class="row items-center">
          <img src="statics/logo.svg" style="max-height: 50px" class="gt-xs q-ml-sm">
        </a>

        <q-space/>
        <span class="text-body1 text-secondary q-mr-sm">User dashboard</span>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn-dropdown
            icon="account_circle"
            no-caps
            color="accent"
            rounded
            flat
          >
            <q-list>
              <q-item>

                <q-item-section>
                  <q-item-label class="text-weight-thin">
                    {{ fName }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onLogout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="arrow_right_alt" color="accent"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="220"
    >
      <q-scroll-area class="fit">

        <q-list padding>
          <q-item-label header class="text-weight-bold text-uppercase text-grey-5">
            Main
          </q-item-label>

          <q-item
            clickable
            :to="{ name: 'dashboard' }"
            v-ripple
            :active="link === 'home'"
            @click="link = 'home'"
            active-class="my-menu-link"
            exact
          >
            <q-item-section avatar>
              <q-icon name="person_pin" color="accent"/>
            </q-item-section>

            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'dashboard.all-products' }"
            v-ripple
            :active="link === 'all-products'"
            @click="link = 'all-products'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="show_chart" color="accent"/>
            </q-item-section>

            <q-item-section>Products</q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'dashboard.suppliers' }"
            v-ripple
            :active="link === 'suppliers'"
            @click="link = 'suppliers'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="bookmarks" color="accent"/>
            </q-item-section>

            <q-item-section>Suppliers</q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'dashboard.orders' }"
            v-ripple
            :active="link === 'orders'"
            @click="link = 'orders'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="credit_card" color="accent"/>
            </q-item-section>

            <q-item-section>Orders</q-item-section>
          </q-item>

        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {defaultMixin} from '../mixins/mixins'
  import {notifySuccess, notifyWarning} from '../my-helpers/helper'

  export default {
    name: 'Dashboard',
    mixins: [defaultMixin],
    data() {
      return {
        leftDrawerOpen: false,
        link: '',
      }
    },
    methods: {
      ...mapActions('auth', ['clearState']),
      onLogout() {
        this.clearState()
        this.$router.push({name: 'auth.login'})
      }
    }
  }
</script>

<style lang="scss">
  .my-menu-link {
    color: $primary
  }

  .q-btn-dropdown--simple .q-btn-dropdown__arrow {
    margin-left: 0px;
  }

</style>
