<template>
  <CDataTable
    hover
    striped
    :items="items"
    :fields="fields"
    :clickable-rows="false"
  >
    <template #actions="{ item }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="$emit('view-threshold', event, item)"
        >
          Show
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="$emit('delete-threshold', event, item)"
        >
          Delete
        </CButton>
      </td>
    </template>
  </CDataTable>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'value',
          label: 'Amount',
          _classes: 'font-weight-bold',
        },
        { label: 'Rate', key: 'rate' },
        { label: 'Actions', key: 'actions' },
      ],
      tableData: this.items,
    }
  },
  watch: {
    items: {
      deep: true,
      handler(val) {
        this.tableData = val
      },
    },
  },
}
</script>
