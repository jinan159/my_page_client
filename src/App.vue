<template>
  <div id="app">
    <Header class="fix-top"/>
    <router-view class="container" style="min-width: 360px;"/>
    <Footer class="footer dev-hidden"/>
  </div>
</template>

<script>
// TODO: vue-bootstrap으로 변경
import Header from './components/includes/Header.vue'
import Footer from './components/includes/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased; /* font 안티엘리어싱 */
  -moz-osx-font-smoothing: grayscale;  /* font 안티엘리어싱(Firefox) */
  text-align: center;
  height: 100%;
}
.page {
  width: 100%;
  height: 100%;
  padding-bottom: 0;
}

.fix-top {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.footer {
    display: inline-block;
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    text-align: center;
}
</style>
