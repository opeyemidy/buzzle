<template>
  <CChartBar :datasets="defaultDatasets" labels="months" />
</template>

<script>
export default {
  name: 'CChartBarExample',
  computed: {
    defaultDatasets() {
      return [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ]
    },
  },
}
</script>
