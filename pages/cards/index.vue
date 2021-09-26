<template>
  <div>
    <CRow>
      <CCol v-if="$fetchState.pending" style="height: 220px">
        <CElementCover :opacity="0.1" />
      </CCol>
      <CCol
        v-for="card in cards"
        v-else
        :key="card.id"
        class="my-1 px-1"
        md="4"
        sm="6"
      >
        <gift-card
          :title="card.name"
          :image="
            card.image !== 'null' ? card.image : '/img/card-placeholder.jpg'
          "
          :link="`/cards/${card.id}`"
        />
      </CCol>
    </CRow>
    <CRow v-if="totalPages > 1">
      <CCol>
        <CPagination
          class="mt-3"
          :active-page.sync="page"
          :pages="totalPages"
          size="lg"
          align="center"
        />
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
      limit: 10,
    }
  },
  async fetch() {
    const { results, page, limit, totalPages, totalResults } =
      await this.$request.getCards({ limit: this.limit, page: this.page })
    this.cards = results
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
}
</script>

<style lang="scss" scoped></style>
