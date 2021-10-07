<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <ValidationObserver ref="form">
                  <CForm @submit.prevent="onSubmit">
                    <h1>Login</h1>
                    <p class="text-muted">Sign In to your account</p>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                      <CInput
                        v-model="login.email"
                        :is-valid="toSetisValid(login.email, errors)"
                        placeholder="Email"
                        type="email"
                        autocomplete="email"
                        :invalid-feedback="errors[0]"
                      >
                        <template #prepend-content
                          ><CIcon name="cil-user"
                        /></template>
                      </CInput>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Password"
                      rules="required"
                    >
                      <CInput
                        v-model="login.password"
                        :is-valid="toSetisValid(login.password, errors)"
                        placeholder="Password"
                        type="password"
                        autocomplete="password"
                        :invalid-feedback="errors[0]"
                      >
                        <template #prepend-content
                          ><CIcon name="cil-lock-locked"
                        /></template>
                      </CInput>
                    </ValidationProvider>
                    <CRow>
                      <CCol col="6" class="text-left">
                        <CButton
                          type="submit"
                          color="primary"
                          class="px-4"
                          :disabled="loading"
                          >{{ loading ? 'logging...' : 'Login' }}</CButton
                        >
                      </CCol>
                      <CCol col="6" class="text-right">
                        <nuxt-link to="/forgot-password">
                          Forgot password?
                        </nuxt-link>
                        <!-- <CButton color="link" class="px-0" to="/forgot-password"
                          >Forgot password?</CButton
                        > -->
                        <CButton color="link" class="d-lg-none" to="/register"
                          >Register now!</CButton
                        >
                      </CCol>
                    </CRow>
                  </CForm>
                </ValidationObserver>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Buzzle</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <!-- <CLink to="/register">
                  <CButton color="light" variant="outline" size="lg">
                    Register Now!
                  </CButton>
                </CLink> -->
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousPage = from
    })
  },
  layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      loading: false,
      previousPage: null,

      login: {
        email: '',
        password: '',
      },
    }
  },
  fetch() {
    this.$router.push({ query: {} })
  },
  head: {
    title: 'Login — Buzzle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  methods: {
    async userLogin() {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        this.loading = false
        if (this.previousPage?.name && this.previousPage?.path !== '/') {
          this.$router.push(this.previousPage.fullPath)
        } else {
          this.$router.push('/dashboard')
        }
      } catch ({ response }) {
        this.loading = false
        if (response) return this.$vToastify.error(response.data.message)
        this.$vToastify.error('server error')
      }
    },
    onSubmit() {
      this.submitTriggered = true
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }
        this.userLogin()
      })
    },
    // toSetisValid(value, errors) {
    //   if (!value && !this.submitTriggered) {
    //     return null
    //   }
    //   if (value && errors.length === 0) return true
    //   else return false
    // },
  },
}
</script>
