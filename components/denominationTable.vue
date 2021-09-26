<template>
  <CDataTable
    hover
    striped
    :items="items"
    :fields="fields"
    :clickable-rows="false"
  >
    <template #thresholds="{ item }">
      <td>
        {{ item.thresholds.length }}
      </td>
    </template>
    <template #actions="{ item }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="$emit('view-denomination', event, item)"
        >
          Show
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="$emit('delete-denomination', event, item)"
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
          key: 'currency',
          label: 'Denomination',
          _classes: 'font-weight-bold',
        },
        { key: 'price' },
        { key: 'description' },
        { key: 'thresholds' },
        { key: 'actions' },
        // {
        //   key: 'show_details',
        //   label: '',
        //   _style: 'width:1%',
        //   sorter: false,
        //   filter: false,
        // },
      ],
    }
  },
}
</script>
