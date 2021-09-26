<template>
  <CModal size="sm" centered :show.sync="alertModal" :close-on-backdrop="false">
    <h4 class="font-weight-light">
      Are you sure you want to perform this action?
    </h4>
    <template #header>
      <h5 class="modal-title">Confirmation</h5>
      <button
        type="button"
        aria-label="Close"
        class="close"
        @click="$emit('alertClose')"
      >
        ×
      </button>
    </template>
    <template #footer>
      <div class="form-actions">
        <button
          type="button"
          class="btn btn-primary"
          @click="$emit('alertAction')"
        >
          Yes
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('alertClose')"
        >
          No
        </button>
      </div>
    </template>
  </CModal>
</template>

<script>
export default {
  props: {
    alertModal: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>
