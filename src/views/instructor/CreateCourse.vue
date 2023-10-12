<template>
  <div class="contain">
    <nav-bar class="navi"></nav-bar>
    <v-row class="text-center">
      <v-col cols="12">
        <side-nav></side-nav>

        <!--main content here-->
        <p>Course Creation Page:-> {{ displayComponent }}</p>

        <div class="main">
          <v-row class="">

            <v-col cols="12" md="3" class="navi2">
             

              <side-menu @currentComp="recievedComponent"></side-menu>
            </v-col>

            
            <v-col cols="12" md="9" class="form1">
            
                <component :is="displayComponent" @changeComp="recievedComponent"></component>


              </v-col
            >
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import CreatePage from "../../components/instructor/createCourse/createContent/createPage.vue";
import OtherPage from "../../components/instructor/createCourse/otherPage.vue";
import SideMenu from "../../components/instructor/createCourse/nav/sideMenu.vue";
import SideNav from "../../components/instructor/sideNav.vue";
import NavBar from "../../components/navBar.vue";
import PlanCourse from "../../components/instructor/createCourse/planCourse.vue";
import LandingPage from "../../components/instructor/createCourse/landingPage.vue";


// Components

export default defineComponent({
  name: "CreateCourse",
  components: {
    NavBar,
    SideNav,
    SideMenu,
    CreatePage,
    OtherPage,
    PlanCourse,
    LandingPage
  },
  data() {
       return {
            displayComponent: 'PlanCourse',
    };
      },
      methods: {
        recievedComponent(val) {
                this.displayComponent = val;
    }
  },
});
</script>

  <style scoped>
.contain {
  text-align: center;
  margin-top: -20px;
}

.navi {
  margin-left: 4%;
  width: 96%;
  margin-top: 20px;
}

.main {
  margin-left: 7%;
  width: 91%;
}
.navi2{
    font-size: 25px;
}

li{
    padding: 20px 0px;
}
</style>
  