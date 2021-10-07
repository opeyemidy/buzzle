<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
               <ValidationObserver ref="form">
              <CForm @submit.prevent="onSubmit">
                <h1>Password Recovery</h1>
                <p class="text-muted">
                  Enter your email in field below to recover your password
                </p>
                <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                <CInput
                v-model="email"
                :is-valid="toSetisValid(email, errors)"
                  placeholder="Email"
                  type="email"
                  autocomplete="email"
                  prepend="@"
                  :invalid-feedback="errors[0]"
                />
                </ValidationProvider>
                <CButton type="submit" color="success" block>{{isLoading?'Sending...':'Send'}}</CButton>
              </CForm>
               </ValidationObserver>
            </CCardBody>
            <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <nuxt-link to="/login">
                    Login
                  </nuxt-link>
                </CCol>
                <CCol col="6" class="text-right">
                  <nuxt-link color="link" to="/register">
                    Register
                  </nuxt-link>
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
  name: 'ForgotPassword',
  layout: 'auth',
  auth: false,
  middleware: 'guest',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    onSubmit() {
      this.submitTriggered = true
      this.$refs.form.validate().then(async (success) => {
        if (!success) {
          return
        }
        this.isLoading = true
        try {
          const response = await this.$request.forgotPassword(
            {email:this.email}
          )
          if (!response) {
            this.email = ''
            this.$vToastify.success(
              'Recovery instructions successfully sent to your email'
            )
          }
          this.isLoading = false
        } catch ({ response }) {
          this.isLoading = false
          this.$vToastify.error(response.data.message)
        }
      })
    },
  },
}
</script>
