<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader> Users </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            table-filter
            sorter
            striped
            :items="items"
            :fields="fields"
            :items-per-page="5"
            :clickable-rows="false"
            :active-page="activePage"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @row-clicked="() => null || rowClicked"
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{ data.item.status }}
                </CBadge>
              </td>
            </template>
            <template #show_details="{ item, index }">
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
                <CCardBody>
                  <CMedia :aside-image-props="{ height: 102 }">
                    <h4>
                      {{ item.username }}
                    </h4>
                    <p class="text-muted">User since: {{ item.registered }}</p>
                    <CButton size="sm" color="info" class="">
                      User Settings
                    </CButton>
                    <CButton size="sm" color="danger" class="ml-1">
                      Delete
                    </CButton>
                  </CMedia>
                </CCardBody>
              </CCollapse>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from './UsersData'
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
        { key: 'username', label: 'Name', _classes: 'font-weight-bold' },
        { key: 'registered' },
        { key: 'role' },
        { key: 'status' },
        {
          key: 'show_details',
          label: '',
          _style: 'width:1%',
          sorter: false,
          filter: false,
        },
      ],
      activePage: 1,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      },
    },
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          return 'primary'
      }
    },
    rowClicked(item, index) {
      this.$router.push({ path: `users/${index + 1}` })
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } })
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    },
  },
}
</script>
