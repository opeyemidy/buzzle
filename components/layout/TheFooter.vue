<template>
  <CFooter :fixed="false">
    <div>
      <a href="#" target="_blank">buzzle</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} cypherdevs.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="#">Cypherdevs</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
