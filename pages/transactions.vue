<template>
  <CRow>
    <page-loader v-if="$fetchState.pending" />
    <CCol v-else col="12">
      <CCard class="px-3 pt-3 pb-0">
        <h6>Transactions</h6>
        <!-- <CCardHeader> Transactions </CCardHeader> -->
        <!-- <CCardBody> -->
        <CDataTable
          hover
          :table-filter="false"
          sorter
          :striped="false"
          :items="transactions"
          :fields="fields"
          :items-per-page="limit"
          :clickable-rows="false"
          :active-page="page"
          :pagination="{ doubleArrows: false, align: 'center' }"
          @row-clicked="() => null || rowClicked"
        >
          <template #cardId="data">
            <td>
              {{ data.item.cardId.name }}
            </td>
          </template>
          <template #amount="data">
            <td>
              {{ toReadableAmount(data.item.amount) }}
            </td>
          </template>
          <template #price="data">
            <td>
              {{ toReadableAmount(data.item.price) }}
            </td>
          </template>
          <template #status="data">
            <td>
              <CBadge :color="getBadge(data.item.status)">
                {{ data.item.status }}
              </CBadge>
            </td>
          </template>
          <template #card_images="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
              </CButton>
            </td>
          </template>
          <template #details="{ item }">
            <CCollapse
              :show="Boolean(item._toggled)"
              :duration="collapseDuration"
            >
              <hr class="mt-0" />
              <CCardBody class="pt-0">
                <CRow :gutters="false" class="flex-nowrap overflow-auto">
                  <CCol
                    v-for="image in item.images"
                    :key="image"
                    col="4"
                    md="2"
                  >
                    <img :src="image" width="100%" alt="card image" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol col="12">
                    <!-- eslint-disable -->
                    <p
                      class="text-center my-5"
                      v-if="item.remark"
                      v-html="
                        '<b>Remark:</b> ' + formatDescription(item.remark)
                      "
                    ></p>
                    <p
                      v-if="item.adminRemark"
                      class="text-center mt-5"
                      v-html="
                        '<b>Admin Remark:</b> ' +
                        formatDescription(item.adminRemark)
                      "
                    ></p>
                  </CCol>
                </CRow>
                <!-- </CMedia> -->
              </CCardBody>
            </CCollapse>
          </template>
        </CDataTable>
        <CPagination
          v-if="totalPages > 1"
          class="mt-3"
          :active-page.sync="page"
          :pages="totalPages"
          size="sm"
          align="center"
        />
        <!-- </CCardBody> -->
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'Transactions',
  data() {
    return {
      collapseDuration: 0,
      fields: [
        { key: 'cardId', label: 'Card' },
        { key: 'currency' },
        { key: 'price' },
        { key: 'rate' },
        { key: 'amount', label: 'Amount(₦)' },
        { key: 'status' },
        { key: 'card_images' },
      ],
      transactions: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
      limit: 20,
    }
  },
  async fetch() {

    try {
      const { results, page, limit, totalPages, totalResults } =
      await this.$request.getTransactions({
        limit: this.limit,
        page: this.page,
      })
    this.transactions = results
    this.page = page
    this.totalPages = totalPages
    this.totalResults = totalResults
    this.limit = limit
    } catch ({response}) {
      this.$nuxt.error({ statusCode:404, message:response.data.message })
    }

  },
  head() {
    return {
      title: 'Transactions — Buzzle',
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
    $route: {
      immediate: true,
      handler(route) {
        if (Object.keys(route.query).length !== 0) {
          this.limit = parseInt(route.query.limit) > 20 || 20
          this.page = parseInt(route.query.page)
          this.$fetch()
        }
      },
    },
    page: {
      handler() {
        const query = Object.entries({
          limit: this.limit,
          page: this.page,
        }).reduce((acc, [key, val]) => {
          if (!val) return acc
          return { ...acc, [key]: val }
        }, {})
        this.$router.push({ query: { ...query } })
        this.$fetch()
      },
    },
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case 'approved':
          return 'success'
        case 'pending':
          return 'warning'
        case 'rejected':
          return 'danger'
        default:
          return 'primary'
      }
    },
    rowClicked(item, index) {
      this.$router.push({ path: `users/${index + 1}` })
    },
    toggleDetails(item, index) {
      // return console.log(item, index)
      this.$set(this.transactions[index], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    },
    toReadableAmount(amount) {
      return amount.toLocaleString(undefined, { minimumFractionDigits: 2 })
    },
  },
}
</script>
