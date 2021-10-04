<template>
  <div class="container-fluid">
    <!-- <WidgetsDropdown /> -->
    <CRow class="flex-nowrap overflow-auto px-2 align-items-center">
      <CCol v-if="$fetchState.pending" style="height: 220px">
        <CElementCover :opacity="0.1" />
      </CCol>
      <CCol
        v-for="card in cards"
        v-else
        :key="card.id"
        class="my-1 px-1"
        md="2"
        col="4"
        @click="setActive(card.id)"
      >
        <gift-card
          :title="card.name"
          :is-active="activeCard === card.id"
          :image="
            card.image !== 'null' ? card.image : '/img/card-placeholder.jpg'
          "
        />
      </CCol>
    </CRow>
    <h3 v-if="cardItem" class="mt-4">
      {{ cardItem.name + ' - ' + activeCurrency }}
    </h3>
    <CTabs v-if="activeCard" class="mt-4">
      <CTab
        title="EXCHANGE RATE"
        active
        :disabled="thresholdItems.length === 0"
      >
        <CRow>
          <CCol col="12" class="my-3">
            <CButton
              v-for="(currency, i) in currencyItems"
              :key="i"
              :variant="activeCurrency === currency ? '' : 'outline'"
              color="primary"
              class="mr-1"
              @click="activeCurrency = currency"
            >
              {{ currency }}
            </CButton>
          </CCol>
          <CCol col="12">
            <CCard v-if="thresholdItems.length > 1">
              <vertical-header-table
                :headers="thresholdHeaders"
                :items="thresholdItems"
              >
                <template #rate-header="{ headerItem }">
                  {{ headerItem.text + setThresholdAmount(activeCurrency) }}
                </template>
                <template #value="{ dataItem }">
                  {{
                    '≥' + setThresholdAmount(activeCurrency) + dataItem.value
                  }}
                </template>
                <template #rate="{ dataItem }">
                  {{ '₦' + dataItem.rate }}
                </template>
              </vertical-header-table>
            </CCard>
          </CCol>
        </CRow>
      </CTab>
      <CTab title="REQUIREMENTS" active>
        <!-- eslint-disable -->
        <div
          class="d-flex align-items-center"
          :class="!cardItem.description ? 'justify-content-center ' : ''"
          style="min-height: 120px"
          v-html="
            formatDescription(cardItem.description) || '<h4>No requirement</h4>'
          "
        ></div>
      </CTab>
    </CTabs>
    <hr class="mt-0" v-if="cardItem" />
    <ValidationObserver ref="form">
      <CForm @submit.prevent="onSubmit">
        <CInputFile
          label="Upload image(s)"
          @change="onFileSelected"
          accept=".png, .jpg, .jpeg"
          multiple
        />
        <div ref="preview" class="d-flex overflow-auto flex-nowrap mb-3"></div>
        <ValidationProvider
          v-slot="{ errors }"
          name="price of uploaded cards"
          rules="required|money"
        >
          <CInput
            label="Price"
            placeholder="Price"
            :description="`the worth of cards in ${setThresholdAmount(
              activeCurrency
            )}`"
            v-model="price"
            :is-valid="toSetisValid(price, errors)"
            :invalid-feedback="errors[0]"
          />
        </ValidationProvider>
        <CTextarea
          v-model="remark"
          label="Remark"
          description="If you have extra info to tell us, you could write it here! If not, ignore it!"
          placeholder="Additional Info about card"
          rows="3"
        />
        <CRow class="justify-content-sm-end">
          <CCol sm="8" md="6">
            <CButton
              block
              size="lg"
              :disabled="!activeCard || isLoading"
              type="submit"
              color="primary"
              >{{ isLoading ? 'Submitting' : 'Submit' }}</CButton
            >
          </CCol>
        </CRow>
      </CForm>
    </ValidationObserver>
    <!-- </CCol> -->
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
// import WidgetsDropdown from '~/components/widgets/WidgetsDropdown'

export default {
  name: 'Dashboard',
  components: {
    // WidgetsDropdown,
  },
  data() {
    return {
      formCollapsed: false,
      denominationModal: false,
      denominationModalDelete: false,
      name: '',
      remark: '',
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
      limit: 30,
      activeCard: '',
      activeCurrency: '',
      thresholdHeaders: [
        {
          text: 'Card Amount',
          value: 'value',
        },
        {
          text: 'Unit Price of 1',
          value: 'rate',
        },
      ],
      cardItem: null,
      currencyItems: [],
      thresholdItems: [],
      denominationItem: {},
      price: '',
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
  head() {
    return {
      title: 'Dashboard — Buzzle',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
  watch: {
    page() {
      this.$fetch()
    },
    activeCurrency() {
      this.changeCurrency()
    },
  },
  methods: {
    onSubmit() {
      this.submitTriggered = true
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }
        this.createTransaction()
      })
    },
    async createTransaction() {
      this.isLoading = true
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('cardId', this.activeCard)
        bodyFormData.append('currency', this.activeCurrency)
        bodyFormData.append('price', this.price)
        if (this.selectedFile) {
          for (const file of this.selectedFile) {
            bodyFormData.append('images', file) // appending every file to formdata
          }
        }
        if (this.remark) bodyFormData.append('remark', this.remark)
        const response = await this.$request.createTransaction(bodyFormData)
        this.isLoading = false
        if (response) {
          this.$vToastify.success('Transaction is in progress')
          const preview = this.$refs.preview
          while (preview.firstChild) {
            preview.removeChild(preview.firstChild)
          }
          this.submitTriggered = false
          this.$refs.form.reset()
          this.activeCard =
            this.activeCurrency =
            this.price =
            this.remark =
            this.selectedFile =
              ''
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
    setActive(id) {
      this.activeCard = id
      this.cardItem = this.cards.find((card) => card.id === this.activeCard)
      this.currencyItems = this.cardItem.denominations.map(
        (item) => item.currency
      )
      this.activeCurrency = this.currencyItems[0]
      this.changeCurrency()
    },
    changeCurrency() {
      this.denominationItem = this.cardItem.denominations.find(
        (denomination) => denomination.currency === this.activeCurrency
      )
      this.thresholdItems = this.denominationItem?.thresholds
    },
    setThresholdAmount(currency) {
      switch (currency) {
        case 'USD':
          return '$'
        case 'UK':
          return '￡'
        case 'AU':
          return 'A$'
        case 'EUR':
          return '€'
        case 'CHF':
          return 'CHF'

        default:
          return ''
      }
    },
  },
}
// https://stackoverflow.com/questions/44607108/vuejs-components-using-scrollintoview
</script>
