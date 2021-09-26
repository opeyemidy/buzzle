<template>
  <div>
    <CForm @submit.prevent="onSubmit">
      <CModal
        title="Denomination Form"
        size="lg"
        :show.sync="denominationModal"
        :close-on-backdrop="false"
      >
        <template #header>
          <h5 class="modal-title">Denomination Form</h5>
          <button
            type="button"
            aria-label="Close"
            class="close"
            @click="$emit('click')"
          >
            ×
          </button>
        </template>
        <CRow>
          <CCol md="6">
            <CSelect
              label="Currency"
              :options="currencies"
              :value.sync="formData.currency"
              placeholder="Please select"
            />
          </CCol>
          <CCol md="6">
            <CInput
              v-model="formData.price"
              label="Price"
              description="either this as fixed rate or threshold rates"
              type="number"
            />
          </CCol>
          <CCol>
            <CTextarea
              v-model="formData.description"
              label="Description"
              placeholder="description..."
              rows="9"
            />
          </CCol>
        </CRow>
        <CButton
          color="secondary"
          class="mr-1 mb-3"
          :disabled="formData.price > 0"
          @click="thresholdModal = true"
        >
          Add threshold
        </CButton>
        <threshold-table
          :items="formData.thresholds"
          @view-threshold="viewThreshold"
          @delete-threshold="deleteItem"
        />
        <threshold-form-dialogue
          :threshold-modal="thresholdModal"
          :threshold-data="editedItem"
          @close="close"
          @add-threshold="addThreshold"
        />
        <template #footer>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              {{ loading ? 'submitting...' : 'Create denomination' }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('click')"
            >
              Cancel
            </button>
          </div>
        </template>
      </CModal>
    </CForm>
    <alert-dialogue
      :alert-modal="thresholdModalDelete"
      @alertClose="closeDelete"
      @alertAction="deleteItemConfirm"
    />
  </div>
</template>

<script>
export default {
  props: {
    denominationData: {
      type: Object,
      default: () => null,
    },
    denominationModal: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      thresholdModal: false,
      thresholdModalDelete: false,
      formData: this.denominationData,
      editedIndex: -1,
      editedItem: {
        rate: 0,
        value: 0,
      },
      defaultItem: {
        rate: 0,
        value: 0,
      },
    }
  },
  watch: {
    denominationData(val) {
      this.formData = val
    },
  },
  methods: {
    onSubmit(event) {
      const denomination = Object.assign({}, this.formData)
      this.$emit('add-denomination', event, denomination)
    },
    addThreshold(event, data) {
      if (data.rate == 0 || data.vale == 0) return // eslint-disable-line
      if (this.editedIndex > -1) {
        Object.assign(this.formData.thresholds[this.editedIndex], data)
      }
      const found = this.formData.thresholds.find(
        (threshold) =>
          threshold.rate === data.rate && threshold.value === data.value
      )
      if (!found) {
        this.formData.thresholds.push(data)
      }
    },
    viewThreshold(event, data) {
      this.editedIndex = this.formData.thresholds.indexOf(data)
      this.editedItem = Object.assign({}, data)
      this.thresholdModal = true
    },
    // editItem(item) {
    //   this.editedIndex = this.formData.thresholds.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.thresholdModal = true
    // },

    deleteItem(item) {
      this.editedIndex = this.formData.thresholds.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.thresholdModalDelete = true
    },

    deleteItemConfirm() {
      this.formData.thresholds.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.thresholdModal = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.thresholdModalDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>
