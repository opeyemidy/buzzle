<template>
  <CRow>
    <page-loader v-if="true" />
    <CCol v-else col="12">
      <CCard>
        <CCardHeader> Transactions </CCardHeader>
        <CCardBody>
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from '~/data/tableData'
export default {
  name: 'Users',
  data() {
    return {
      // items: usersData,
      items: usersData.map((item, id) => {
        return { ...item, id }
      }),
      collapseDuration: 0,
      fields: [
        { key: 'cardId', label: 'Card', _classes: 'font-weight-bold' },
        { key: 'currency' },
        { key: 'price' },
        { key: 'rate' },
        { key: 'amount' },
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
  },
}
</script>
