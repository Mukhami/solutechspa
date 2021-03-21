<template>
  <q-layout
    view="hHh lpR fFf"
    class="bg-grey-1"
  >
    <q-header
      bordered
      class="bg-white text-grey-8 q-py-xs"
    >
      <q-toolbar>
        <q-toolbar-title>
          <a href="/" style="text-decoration: none" class="row items-center">
            <img src="statics/logo.svg" style="max-height: 50px" class="gt-xs q-ml-sm">
          </a>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>



      <div id="footer-lower">
        <span>
          © 2021 Solutech
        </span>
      </div>

    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    data() {
      return {}
    },

    computed: {
      appName() {
        return process.env.APP_NAME
      }
    }
  }
</script>

<style lang="scss">

</style>
