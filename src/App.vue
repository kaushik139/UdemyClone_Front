<template>
  <div
    class="contain"
    style="margin: 0px; padding: 0px; width: 100%; text-align: center"
  >
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
// import navBar from "./components/navBar.vue";

export default {
  components: {
    // navBar
  },
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>

</style>
