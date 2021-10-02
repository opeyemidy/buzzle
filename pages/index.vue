<template>
  <div>
    <h1>homepage</h1>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  head() {
    return {
      title: 'Login — Buzzle',
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
}
</script>

<style lang="scss" scoped></style>
