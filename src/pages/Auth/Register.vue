<template>
  <q-page
    padding
    style="max-width: 500px;"
    class="q-mx-auto"
  >
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit.prevent="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            outlined
            type="text"
            v-model="form.name"
            label="Name *"
            hint="Your Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            outlined
            type="email"
            v-model="form.email"
            label="Your email *"
            hint="Your email address"
            debounce="1000"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Please type something',
              emailUnique
            ]"
          />

          <q-input
            outlined
            type="password"
            v-model="form.password"
            label="Password *"
            hint="Minimum 8 characters"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            outlined
            type="password"
            v-model="form.password_confirm"
            label="Password confirm *"
            hint="Confirm your password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-list>
            <q-item tag="label" class="q-px-none">
              <q-item-section avatar class="q-mx-none q-px-none">
                <q-toggle v-model="form.terms"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>I accept the <a target="_blank" rel="nofollow" class="text-black text text-weight-bold"
                                              href="https://solutech.co.ke/">Terms and
                  Conditions</a></q-item-label>
              </q-item-section>
            </q-item>
            <q-item tag="label" class="q-px-none">
              <q-item-section avatar class="q-mx-none q-px-none">
                <q-toggle v-model="form.privacy"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>I accept the <a target="_blank" rel="nofollow" class="text-black text text-weight-bold"
                                              href="https://solutech.co.ke/">Privacy
                  Policy</a></q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div>
            <q-btn
              no-caps
              label="Submit"
              type="submit"
              color="primary"
              unelevated
            />

            <q-btn
              class="q-ml-md"
              flat
              to="/auth/login"
              no-caps
              label="Login"
              type="submit"
              color="primary"
            />

            <q-inner-loading :showing="form.loading">
              <q-spinner-ios size="2.5rem" color="primary"/>
            </q-inner-loading>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import {notifySuccess, notifyWarning} from "../../my-helpers/helper"
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        validations: {
        },

        form: {
          name: null,
          email: null,
          password: null,
          password_confirm: null,
          terms: false,
          privacy: false,
          loading: false
        },
      }
    },

    methods: {
      ...mapActions('auth', ['setState']),

      emailUnique(email) {
        return this.$axios({url: 'user/register/email-unique', data: {email}, method: 'POST'})
          .then(resp => {
            return resp.data.message || "Email is already registered."
          })
      },

      onSubmit() {
        if (!this.form.terms) {
          notifyWarning('Terms and Conditions not checked')
          return false;
        }
        if (!this.form.privacy) {
          notifyWarning('Privacy not checked')
          return false;
        }
        this.form.loading = true
        this.$axios.post('user/register', this.form)
          .then(response => {
            this.setState(response.data)
            notifySuccess('Kindly log in using your created credentials.')
            this.$router.push({name: 'dashboard'})
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.form.loading = false
          })

      }
    }
  }
</script>
