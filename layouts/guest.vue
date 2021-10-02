<template>
  <div>
    <main>
      <transition name="fade" mode="out-in">
        <Nuxt />
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Guest',
  components: {},
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
