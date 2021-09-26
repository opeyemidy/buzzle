<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard class="mb-0">
              <CCardHeader> Card details </CCardHeader>
              <CCardBody>
                <CForm @submit.prevent="onSubmit">
                  <CRow>
                    <CCol class="d-flex d-sm-block mb-3 justify-content-center">
                      <CImg
                        v-if="card.image !== 'null'"
                        style="max-width: 245px"
                        :src="card.image"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="6" md="6">
                      <CInput
                        v-model="card.name"
                        label="Card name"
                        description="Here's some help text"
                        type="text"
                      />
                    </CCol>
                    <CCol sm="6" md="6">
                      <CInputFile label="Card image" @change="onFileSelected" />
                    </CCol>
                    <CCol>
                      <CTextarea
                        v-model="card.description"
                        label="Description"
                        placeholder="Content..."
                        rows="9"
                      />
                    </CCol>
                  </CRow>
                  <CButton
                    color="secondary"
                    class="mr-1 mb-3"
                    @click="denominationModal = true"
                  >
                    Add Denomination
                  </CButton>
                  <denomination-table
                    :items="card.denominations"
                    @view-denomination="viewDenomination"
                    @delete-denomination="deleteItem"
                  />
                  <denomination-form-dialogue
                    :denomination-data="editedItem"
                    :denomination-modal="denominationModal"
                    :loading="isDenominationLoading"
                    @click="close"
                    @add-denomination="addDenomination"
                  />
                  <div class="form-actions text-align">
                    <CButton type="submit" color="primary">{{
                      isLoading ? 'Submitting...' : 'Save Changes'
                    }}</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <alert-dialogue
        :alert-modal="denominationModalDelete"
        @alertClose="closeDelete"
        @alertAction="deleteItemConfirm"
      />
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},
  data() {
    return {
      formCollapsed: false,
      denominationModal: false,
      denominationModalDelete: false,
      name: '',
      description: '',
      editedIndex: -1,
      editedItem: {
        price: 0,
        currency: '',
        description: '',
        thresholds: [],
      },
      defaultItem: {
        price: 0,
        currency: '',
        description: '',
        thresholds: [],
      },
      defaultProp: {},
      denominations: [],
      isDenominationLoading: false,
      denominationData: null,
      card: {},
      page: 1,
      totalPages: 0,
      totalResults: 0,
      limit: 3,
    }
  },
  async fetch() {
    this.card = await this.$request.getCard(this.$route.params.id)
  },
  watch: {
    page() {
      this.$fetch()
    },
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('name', this.card.name)
        bodyFormData.append('image', this.selectedFile)
        bodyFormData.append('description', this.card.description)
        const response = await this.$request.updateCard(
          this.$route.params.id,
          bodyFormData
        )
        this.isLoading = false
        if (response) {
          this.$vToastify.success('Card updated successfully')
          this.$fetch()
        }
      } catch ({ response }) {
        this.isLoading = false
        this.$vToastify.error(response.data.message)
      }
    },
    async addDenomination(event, data) {
      // return console.log(data)
      // /* eslint-disable */
      if (this.editedIndex > -1) {
        const { id, currency, description, price, thresholds } = data
        this.isDenominationLoading = true
        try {
          const response = await this.$request.updateDenomination(id, {
            currency,
            price,
            description,
            thresholds,
          })
          if (response) this.isDenominationLoading = false
          this.$vToastify.success('denomination updated successfully')
          this.$fetch()
          this.close()
        } catch ({ response }) {
          this.isDenominationLoading = false
          this.$vToastify.error(response.data.message)
        }
        Object.assign(this.card.denominations[this.editedIndex], data)
      } else {
        const { currency, description, price, thresholds } = data
        this.isDenominationLoading = true
        try {
          const response = await this.$request.addDenomination({
            cardId: this.$route.params.id,
            currency,
            price,
            description,
            thresholds,
          })
          if (response) {
            this.isDenominationLoading = false
            this.$vToastify.success('denomination added successfully')
            this.$fetch()
            this.close()
          }
        } catch ({ response }) {
          this.isDenominationLoading = false
          this.$vToastify.error(response.data.message)
        }
      }
    },
    viewDenomination(event, data) {
      this.editedIndex = this.card.denominations.indexOf(data)
      this.editedItem = Object.assign({}, data)
      this.denominationModal = true
    },

    deleteItem(event, item) {
      this.editedIndex = this.card.denominations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.denominationModalDelete = true
    },

    async deleteItemConfirm() {
      try {
        const response = await this.$request.deleteDenomination(
          this.editedItem.id
        )
        if (!response) this.$vToastify.success('deleted successfully')
        this.$fetch()
        this.closeDelete()
      } catch ({ response }) {
        this.$vToastify.error(response.data.message)
      }
    },

    close() {
      this.denominationModal = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.denominationModalDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
