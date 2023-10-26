<template>
    <div class="contain">
        <nav-bar class="navi"></nav-bar>

      <v-row class="text-center">
        <v-col cols="12">

            <side-nav></side-nav>
        {{ a }}
        <p>Messages Page</p>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
import SideNav from '../../components/instructor/sideNav.vue';
import NavBar from '../../components/common/navBar.vue';
  
  // Components
  
  export default defineComponent({
    name: 'Messages',
    components: {
        NavBar,
        SideNav
      
    },
    data() {
      return {
        a: 'data'
      }
    }
  });
  </script>
  
  <style scoped>
.contain{
  text-align: center;
  margin-top: -20px;
}

.navi{
  margin-left: 4%;
  width: 96%;
  margin-top: 20px;
}

</style>