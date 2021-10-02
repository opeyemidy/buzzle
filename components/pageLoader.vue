<template>
  <div>
    <CElementCover class="page-cover" :opacity="0.1" />
  </div>
</template>
<style scoped>
.page-cover {
  width: calc(100% - 256px);
  left: 256px;
}
@media only screen and (max-width: 990px) {
  .page-cover {
    left: 0;
    width: 100%;
  }
}
</style>
