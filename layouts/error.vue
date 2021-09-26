<template>
  <div class="nuxt-error">
    <error-404 v-if="error.statusCode === 404" />
    <error-500 v-else />
  </div>
</template>
<script>
import error404 from '~/components/error/404.vue'
import error500 from '~/components/error/500.vue'
export default {
  name: 'NuxtError',
  components: {
    error404,
    error500,
  },
  layout: 'auth',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
