<script setup()>
  import { RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';

  // eslint-disable-next-line vue/no-export-in-script-setup
  export default {
    name: "App",
    components: {
      Navbar,
      Footer
    }
  }
</script>

<template>
  <Navbar />
  <router-view class="container"></router-view>
  <Footer />
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #444;
  }

  .container {
    min-height: 300px;
  }

  a {
    transition: .5s;
  }

  a:hover {
    color: #C1B696;
  }
</style>
