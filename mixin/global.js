export default {
  data() {
    return {
      submitTriggered: false,
      isLoading: false,
      currencies: ['USD', 'UK', 'AU', 'EUR', 'CHF'],
      selectedFile: null,
    }
  },
  methods: {
    toSetisValid(value, errors) {
      if (!value && !this.submitTriggered) {
        return null
      }
      if (value && errors.length === 0) return true
      else return false
    },
    // make this async if you need
    updateQuery() {
      const query = Object.entries(this.filter).reduce((acc, [key, val]) => {
        if (!val) return acc
        return { ...acc, [key]: val }
      }, {})

      /* this will update your URL query based on toggled values.
       Be sure to update the Name to what your actual route is */
      this.$router.replace({ name: 'Studentview', query: { ...query } })
      this.axios
        .get('/api/student', { params: query })
        .then(({ data }) => {
          this.students = data
        })
        .catch((err) => console.log(err)) // do what you need with your errors
    },
    onFileSelected(file, event) {
      this.selectedFile = event.target.files[0]
      // this.selectedFile = file
      // console.log(this.selectedFile)
    },
  },
}

// filter: {
//         name: '',
//         gender: '',
//         phone: '',
//         class: ''
//       },

// {/* <v-text-field
//           v-model="filter.gender"
//           append-icon="mdi-magnify"
//           label="Filter Gender"
//           single-line
//           outlined
//           width="20"
//           dense
//           hide-details
//           @change="updateQuery"
//         ></v-text-field> */}

// https://forum.vuejs.org/t/how-to-update-vue-router-query-params-based-on-mutiple-input-filters-and-watch-route/108512/2
