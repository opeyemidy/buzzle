<template>
  <CChartLine :datasets="defaultDatasets" labels="months" />
</template>

<script>
export default {
  name: 'CChartLineExample',
  computed: {
    defaultDatasets() {
      return [
        {
          label: 'Data One',
          backgroundColor: 'rgb(228,102,81,0.9)',
          data: [30, 39, 10, 50, 30, 70, 35],
        },
        {
          label: 'Data Two',
          backgroundColor: 'rgb(0,216,255,0.9)',
          data: [39, 80, 40, 35, 40, 20, 45],
        },
      ]
    },
  },
}
</script>
