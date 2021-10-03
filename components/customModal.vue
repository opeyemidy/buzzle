<template>
  <CModal
    title="Modal title"
    color="primary"
    size="sm"
    :close-on-backdrop="false"
    :show.sync="show"
    centered
  >
    <template #header>
      <slot name="header">{{ null }}</slot>
    </template>
    <template #footer>
      <slot name="footer">{{ null }}</slot>
    </template>
    <slot>{{ null }}</slot>
  </CModal>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      warningModal: true,
    }
  },
}
</script>
