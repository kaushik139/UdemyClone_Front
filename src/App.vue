<template>
  <div
    class="contain"
    style="margin: 0px; padding: 0px; width: 100%; text-align: center"
  >
    <nav-bar></nav-bar>
    <router-view />
  </div>

  <!-- footer -->
  <footer class="bg-dark text-white pt-10" style="min-height: 50px; margin-top: 100px; flex-shrink: 0 !important;">
    <div class="d-flex justify-center ">
      <v-icon class="mdi-copyright mdi mr-2"></v-icon>
      udemy_clone_
      <h5>{{ Date(now).slice(11, 15) }}</h5>
    </div>
  </footer>
  <!-- <template>
  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        size="small"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template> -->
</template>

<script>
// import navBar from "./components/navBar.vue";

export default {
  components: {
    // navBar
  },
  name: "App",

  data: () => ({
    icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    //
  }),
  async mounted() {
    this.$store.dispatch(
      "changeUser",
      localStorage.getItem("role") || "students"
    );
  },
};
</script>

<style scoped>
</style>
