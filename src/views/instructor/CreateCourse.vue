<template>
  <div class="contain">
    <nav-bar class="navi"></nav-bar>
    <v-row class="text-center">
      <v-col cols="12">
        <side-nav></side-nav>
        
        <!--main content here-->
        <div class="main">
          <v-row class="">
            
            <!-- SideNav -->
            <v-col cols="12" md="3" class="navi2">
              <side-menu @currentComp="recievedComponent"></side-menu>
            </v-col>
            
            <!-- changing content -->
            <v-col cols="12" md="9" class="form1">

              <component :is="currentCompGetter" @changeComp="recievedComponent"></component>
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
import { mapGetters } from "vuex";
import CreatePage from "../../components/instructor/createCourse/createContent/createPage.vue";
import SideMenu from "../../components/instructor/createCourse/nav/sideMenu.vue";
import SideNav from "../../components/instructor/sideNav.vue";
import NavBar from "../../components/common/navBar.vue";
import PlanCourse from "../../components/instructor/createCourse/others/planCourse.vue";
import LandingPage from "../../components/instructor/createCourse/others/landingPage.vue";
import PricingPage from "../../components/instructor/createCourse/others/pricingPage.vue";
import PublishPage from "../../components/instructor/createCourse/others/publishPage.vue";


// Components

export default defineComponent({
  name: "CreateCourse",
  components: {
    NavBar,
    SideNav,
    SideMenu,
    CreatePage,
    PlanCourse,
    LandingPage,
    PricingPage,
    PublishPage
  },

  data() {
       return {
           // displayComponent: 'PlanCourse',
           draftName: '',

    };
    },

    computed: {
        // ...mapGetters(['instructor/currentCompGetter']),
        ...mapGetters('instructor', ['currentCompGetter'])
    },
    
      methods: {
    //     recievedComponent(val) {
    //             this.displayComponent = val;
    // }
  },

    async mounted() {
      this.draftID = localStorage.getItem('courseDraft');
        if (this.draftID !== null) {
          await this.$store.dispatch('instructor/getDraftCourse', this.draftID);
      }
  }
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
    margin-top: 2%;
    font-size: 25px;
}

li{
    padding: 20px 0px;
}
.form1{
  margin-top: 2%;
}
</style>
  