<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <ValidationObserver ref="form">
                <CForm @submit.prevent="onSubmit">
                  <h1>Password Reset</h1>
                  <p class="text-muted">
                    Enter your new password in fields below
                  </p>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    vid="confirmation"
                    rules="required|strong"
                  >
                    <CInput
                      v-model="confirmPassword"
                      label="password"
                      :is-valid="toSetisValid(payload.password, errors)"
                      placeholder="enter new password"
                      type="password"
                      :invalid-feedback="errors[0]"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-lock-locked"
                      /></template>
                    </CInput>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="confirm password"
                    rules="required|confirmed:confirmation"
                  >
                    <CInput
                      v-model="payload.password"
                      label="confrim password"
                      :is-valid="toSetisValid(confirmPassword, errors)"
                      placeholder="re-enter new password"
                      type="password"
                      :invalid-feedback="errors[0]"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-lock-locked"
                      /></template>
                    </CInput>
                  </ValidationProvider>
                  <CButton
                    type="submit"
                    color="primary"
                    :disabled="isLoading"
                    block
                    >{{ isLoading ? 'Resetting...' : 'Reset' }}</CButton
                  >
                </CForm>
              </ValidationObserver>
            </CCardBody>
            <CCardFooter class="p-4">
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  layout: 'auth',
  auth: false,
  middleware: 'guest',
  data() {
    return {
      payload: {
        password: '',
      },
      confirmPassword: '',
      token: '',
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.token) {
          this.token = route.query.token
        } else {
          this.$router.push('/')
        }
      },
    },
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
          const response = await this.$request.resetPassword(
            this.token,
            this.payload
          )
          if (!response) {
            setTimeout(() => this.$router.push('/login'), 3000)
            this.$vToastify.success(
              'Password reset successful!, you can now login with new password'
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
