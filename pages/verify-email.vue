<template>
  <div></div>
</template>

<script>
export default {
  name: 'VerifyEmail',
  layout: 'auth',
  auth: false,
  async fetch() {
    if (!this.$route?.query.token) {
      return this.$nuxt.error({ statusCode:404, message:'not found' })
    }
    try {
      const response =
        await this.$request.verifyEmail(this.$route.query.token)
        if(!response)
       await this.$vToastify.success(
              'Email verification successful'
            )
this.$router.push('/dashboard')
    } catch (error) {
      if(error.response){
          await this.$vToastify.error(error.response.data.message)
      }
      this.$router.push('/dashboard')
    }
  },
}
</script>
