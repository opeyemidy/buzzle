<template>
  <CRow>
    <page-loader v-if="$fetchState.pending" />
    <CCol v-else col="12">
      <CCard class="px-3 pt-3 pb-0">
        <h6>Payments</h6>
        <CDataTable
          hover
          :table-filter="false"
          sorter
          :striped="false"
          :items="payments"
          :fields="fields"
          :items-per-page="limit"
          :clickable-rows="false"
          :active-page="page"
          :pagination="{ doubleArrows: false, align: 'center' }"
          @row-clicked="() => null || rowClicked"
        >
          <template #name="data">
            <td>
              {{ data.item.paymentDetails.name }}
            </td>
          </template>
          <template #bankName="data">
            <td>
              {{ data.item.paymentDetails.bankName }}
            </td>
          </template>
          <template #accountNumber="data">
            <td>
              {{ data.item.paymentDetails.accountNumber }}
            </td>
          </template>
          <template #amount="data">
            <td>
              {{ toReadableAmount(data.item.amount) }}
            </td>
          </template>
          <template #status="data">
            <td>
              <CBadge :color="getBadge(data.item.status)">
                {{ data.item.status }}
              </CBadge>
            </td>
          </template>
          <template #remark="{ item, index }">
            <td class="py-2">
              <CButton
                :color="!item.adminRemark ? 'grey' : 'primary'"
                :variant="!item.adminRemark ? '' : 'outline'"
                square
                :disabled="!item.adminRemark"
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{
                  !item.adminRemark
                    ? 'no remark'
                    : Boolean(item._toggled)
                    ? 'Hide'
                    : 'Show'
                }}
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
                <!-- eslint-disable -->
                <p
                  v-if="item.adminRemark"
                  class="text-center mt-5"
                  v-html="
                    '<b>Admin Remark:</b> ' +
                    formatDescription(item.adminRemark)
                  "
                ></p>
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'Payments',
  data() {
    return {
      collapseDuration: 0,
      fields: [
        { key: 'name', label: 'Account Name' },
        { key: 'bankName' },
        { key: 'accountNumber' },
        { key: 'amount', label: 'Amount(₦)' },
        { key: 'status' },
        { key: 'remark' },
      ],
      payments: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
      limit: 20,
    }
  },
  async fetch() {
    const { results, page, limit, totalPages, totalResults } =
      await this.$request.getPayments({
        limit: this.limit,
        page: this.page,
      })
    this.payments = results
    this.page = page
    this.totalPages = totalPages
    this.totalResults = totalResults
    this.limit = limit
  },
  head() {
    return {
      title: 'Payments — Buzzle',
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
          this.limit = parseInt(route.query.limit)
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
        case 'completed':
          return 'success'
        case 'processing':
          return 'warning'
        case 'cancelled':
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
      this.$set(this.payments[index], '_toggled', !item._toggled)
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
