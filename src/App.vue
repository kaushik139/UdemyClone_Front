<template>
  <div
    class="contain"
    style="margin: 0px; padding: 0px; width: 100%; text-align: center"
  >
    <nav-bar></nav-bar>
    <router-view />
  </div>

  <!-- footer -->
  <footer class="bg-dark text-white pt-10" style="min-height: 50px; margin-top: 100px;">
    <div class="d-flex justify-center ">
      <v-icon class="mdi-copyright mdi mr-2"></v-icon>
      udemy_clone_
      <h5>{{ Date(now).slice(11, 15) }}</h5>
    </div>
  </footer>
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
  mounted() {
    this.$store.dispatch(
      "changeUser",
      localStorage.getItem("role") || "students"
    );
  },
};
</script>

<style scoped>
</style>
