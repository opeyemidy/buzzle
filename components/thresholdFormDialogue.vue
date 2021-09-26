<template>
  <CForm @submit.prevent="onSubmit">
    <CModal
      title="Threshold Form"
      size="sm"
      :show.sync="thresholdModal"
      :close-on-backdrop="false"
      centered
    >
      <template #header>
        <h5 class="modal-title">Add Threshold</h5>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$emit('close')"
        >
          ×
        </button>
      </template>
      <CRow>
        <CCol>
          <CInput
            v-model="formData.value"
            col="12"
            label="Amount"
            description="amount to threshold rate"
            type="number"
          />
        </CCol>
        <CCol col="12">
          <CInput
            v-model="formData.rate"
            label="Rate"
            description="the threshold rate"
            type="number"
          />
        </CCol>
      </CRow>
      <template #footer>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Create threshold
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </template>
    </CModal>
  </CForm>
</template>

<script>
export default {
  props: {
    thresholdModal: {
      type: Boolean,
      default: () => false,
    },
    thresholdData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      formData: this.thresholdData,
    }
  },
  watch: {
    thresholdData(val) {
      this.formData = val
    },
  },
  methods: {
    onSubmit(event) {
      const threshold = Object.assign({}, this.formData)
      this.$emit('add-threshold', event, threshold)
      this.$emit('close')
    },
  },
}
</script>
