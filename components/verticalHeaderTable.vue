<template>
  <div>
    <div class="position-relative table-responsive">
      <table class="table table-hover table-bordered mb-0">
        <!-- <thead>
          <tr>
            <th v-for="header in headers" :key="header.value">
              {{ header.text }}
            </th>
            <th></th>
          </tr>
        </thead> -->
        <tbody>
          <tr v-for="header in headers" :key="header.value">
            <th class="vartical-table-Header font-weight-light">
              <slot :name="header.value + '-header'" :header-item="header">
                {{ header.text }}
              </slot>
            </th>
            <td v-for="(item, i) in fieldData(header.value)" :key="i">
              <slot :name="header.value" :data-item="items[i]">
                {{ item }}
              </slot>
            </td>
          </tr>
          <!-- <tr v-for="(item, i) in items" :key="i">
            <td v-for="dataItem in headers" :key="dataItem.value">
              <slot :name="dataItem.value" :data-item="item">{{
                item[dataItem.value]
              }}</slot>
            </td>
            <td>...</td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <!-- <div class="d-flex table-footer justify-content-between">
      <span>{{ items.length }} results</span>
      <div>
        <Button disabled class="button">Previous</Button>
        <Button> Next </Button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    itemKey: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  methods: {
    fieldData(header) {
      return this.items.map((item) => item[header])
    },
  },
}
</script>
<style scoped>
.vartical-table-Header {
  color: var(--primary);
}
</style>
