<template>
  <div>
    <WidgetsDropdown />
    <CCard>
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard class="mb-0">
              <CCardHeader>
                <CIcon name="cil-pencil" /> Add card
                <div class="card-header-actions">
                  <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                  >
                    <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                    />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse :show="formCollapsed">
                <CCardBody>
                  <CForm @submit.prevent="onSubmit">
                    <CRow>
                      <CCol sm="6" md="6">
                        <CInput
                          v-model="name"
                          label="Card name"
                          description="Here's some help text"
                          type="text"
                        />
                      </CCol>
                      <CCol sm="6" md="6">
                        <CInputFile
                          label="Card image"
                          @change="onFileSelected"
                        />
                      </CCol>
                      <CCol>
                        <CTextarea
                          v-model="description"
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
                      :items="denominations"
                      @view-denomination="viewDenomination"
                      @delete-denomination="deleteItem"
                    />
                    <denomination-form-dialogue
                      :denomination-data="editedItem"
                      :denomination-modal="denominationModal"
                      @click="close"
                      @add-denomination="addDenomination"
                    />
                    <div class="form-actions text-align">
                      <CButton type="submit" color="primary">{{
                        isLoading ? 'Creating...' : 'Create Card'
                      }}</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCollapse>
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
    <CRow>
      <CCol v-if="$fetchState.pending" style="height: 220px">
        <CElementCover :opacity="0.1" />
      </CCol>
      <CCol
        v-for="card in cards"
        v-else
        :key="card.id"
        class="my-1 px-1"
        md="4"
        sm="6"
      >
        <gift-card
          :title="card.name"
          :image="
            card.image !== 'null' ? card.image : '/img/card-placeholder.jpg'
          "
          :link="`/cards/${card.id}`"
        />
      </CCol>
    </CRow>
    <CRow v-if="totalPages > 1">
      <CCol>
        <CPagination
          class="mt-3"
          :active-page.sync="page"
          :pages="totalPages"
          size="lg"
          align="center"
        />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import WidgetsDropdown from '~/components/widgets/WidgetsDropdown'

export default {
  name: 'Dashboard',
  components: {
    WidgetsDropdown,
  },
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
      denominationData: null,
      cards: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
      limit: 3,
    }
  },
  async fetch() {
    const { results, page, limit, totalPages, totalResults } =
      await this.$request.getCards({ limit: this.limit, page: this.page })
    this.cards = results
    this.page = page
    this.totalPages = totalPages
    this.totalResults = totalResults
    this.limit = limit
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
        bodyFormData.append('name', this.name)
        bodyFormData.append('image', this.selectedFile)
        bodyFormData.append('description', this.description)
        bodyFormData.append('denominations', JSON.stringify(this.denominations))
        const response = await this.$request.createCard(bodyFormData)
        this.isLoading = false
        if (response) {
          this.$vToastify.success('Card created successfully')
        }
      } catch ({ response }) {
        this.isLoading = false
        this.$vToastify.error(response.data.message)
      }
    },
    addDenomination(event, data) {
      if (this.editedIndex > -1) {
        Object.assign(this.denominations[this.editedIndex], data)
      } else {
        const foundDenomination = this.denominations.find(
          (denomination) => denomination.currency === data.currency
        )
        if (!foundDenomination) this.denominations.push(data)
      }
      this.close()
    },
    viewDenomination(event, data) {
      this.editedIndex = this.denominations.indexOf(data)
      this.editedItem = Object.assign({}, data)
      this.denominationModal = true
    },

    deleteItem(event, item) {
      this.editedIndex = this.denominations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.denominationModalDelete = true
    },

    deleteItemConfirm() {
      this.denominations.splice(this.editedIndex, 1)
      this.closeDelete()
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
