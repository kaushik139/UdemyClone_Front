<template>
<div class="contain">
<nav-bar class="navi"></nav-bar>

  <div class="row">
    <div class="col-md-12">

      <side-nav></side-nav>
      Home Page
      
      <p>For Instructors</p>
    </div>
  </div>

  
</div>
</template>

<script>
import { defineComponent } from 'vue';
import SideNav from '../../components/instructor/sideNav.vue';
import NavBar from '../../components/common/navBar.vue';

// Components

export default defineComponent({
  name: 'HomeView',
  components: {
    SideNav,
    NavBar
    
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
