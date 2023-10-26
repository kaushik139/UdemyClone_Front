<template>
  <div class="contain ">
    <nav-bar></nav-bar>
    <div class="row">
      <div class="col-md-12">
        Home Page
        <p>for students</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "../../components/common/navBar.vue";

// Components

export default defineComponent({
  name: "HomeView",
  components: {NavBar},
  data() {
    return {
      a: "data",
    };
  },
});
</script>
