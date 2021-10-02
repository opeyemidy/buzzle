<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <ValidationObserver ref="form">
                <CForm @submit.prevent="onSubmit">
                  <h1>Register</h1>
                  <p class="text-muted">Create your account</p>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Username"
                    rules="required"
                  >
                    <CInput
                      v-model="register.username"
                      :is-valid="toSetisValid(register.username, errors)"
                      placeholder="Username"
                      autocomplete="username"
                      :invalid-feedback="errors[0]"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-user"
                      /></template>
                    </CInput>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <CInput
                      v-model="register.email"
                      :is-valid="toSetisValid(register.email, errors)"
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
                      v-model="register.password"
                      :is-valid="toSetisValid(register.password, errors)"
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
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Confirm password"
                    rules="required"
                  >
                    <CInput
                      v-model="register.confirmPassword"
                      :is-valid="toSetisValid(register.confirmPassword, errors)"
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
                  <CButton color="success" type="submit" block>{{
                    isLoading ? 'registering..' : 'Create Account'
                  }}</CButton>
                </CForm>
              </ValidationObserver>
            </CCardBody>
            <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook"> Facebook </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter"> Twitter </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  layout: 'auth',
  auth: false,
  middleware: 'guest',
  data() {
    return {
      loading: false,
      previousPage: null,

      register: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  fetch() {
    this.$router.push({ query: {} })
  },
  head: {
    title: 'Register — Buzzle',
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
    async userRegister() {
      this.isLoading = true
      try {
        const response = await this.$request.register(this.register)

        this.isLoading = false
        if (response) {
          this.$vToastify.success('registeration successful')
          setTimeout(async () => {
            const { email, password } = this.register
            const loginResponse = await this.$auth.loginWith('local', {
              data: { email, password },
            })
            if (loginResponse) {
              this.$router.push('/dashboard')
            }
          }, 3000)
        }
      } catch ({ response }) {
        this.$vToastify.error(response.data.message)
        this.isLoading = false
      }
    },
    onSubmit() {
      this.submitTriggered = true
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }
        this.userRegister()
      })
    },
  },
}
</script>
