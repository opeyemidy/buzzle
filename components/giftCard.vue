<template>
  <div class="content">
    <nuxt-link :to="link">
      <div class="content-overlay"></div>
      <img class="content-image" :src="image" />
      <div class="content-details fadeIn-bottom">
        <h3 class="content-title">{{ title }}</h3>
        <!-- <p class="content-text"><i class="fa fa-map-marker"></i> Russia</p> -->
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => '',
      required: true,
    },
    image: {
      type: String,
      default: () => '',
      required: true,
    },
    link: {
      type: String,
      default: () => '',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway);

body {
  background: #f9f9f9;
  font-size: 16px;
  font-family: 'Raleway', sans-serif;
}

.container {
  margin-top: 200px;
}

.title {
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 10px;
}

.content {
  position: relative;
  margin: auto;
  overflow: hidden;
}

.content .content-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  -webkit-transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
}

.content:hover .content-overlay {
  opacity: 1;
}

.content-image {
  width: 100%;
}

img {
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.content-details {
  position: absolute;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.content:hover .content-details {
  top: 50%;
  left: 50%;
  opacity: 1;
}

.content-details h3 {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.15em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
}

.content-details p {
  color: #fff;
  font-size: 0.8em;
}

.fadeIn-bottom {
  top: 80%;
}
</style>
