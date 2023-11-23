<template>
  <div v-if="show" class="contain mt-0">
    <div class="text-left m-0 pl-2 d-flex" style="background:grey">
       <h2 class="ml-4">Udemy@dmin</h2>
       <v-spacer></v-spacer>
       <div class="search m-1"><search-bar></search-bar></div>
       <v-btn class="mr-2 mt-1" append-icon="mdi-logout"  style="background-color:rgb(170, 169, 169)">Logout
        <v-dialog activator="parent" v-model="dialog" width="25%">
            <v-card>
                <v-card-title class="text-center">
                    Are you sure ?
                </v-card-title>
                <v-card-actions >
                    <v-col cols="5" class="text-right"><v-btn append-icon="mdi-check" color="red" elevation="2" @click="logout">Yes</v-btn></v-col>
                    <v-col cols="5" class="text-right"><v-btn append-icon="mdi-alpha-x-circle-outline" color="green" elevation="2" @click="dialog = false">No</v-btn></v-col>
                    
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
       </div>
    <div style="position: relative">
      <!-- <side-nav></side-nav> -->

      <v-row class="ml-2 md:ml-12">
        <v-col
          cols="10"
          sm="6"
          md="4"
          lg="3"
          class="m-4 ml-12"
          style="min-width: 26%"
        >
          <v-card elevation="4">
            <v-card-title class="mt-3 yelloText">Courses</v-card-title>
            <v-card-subtitle>Total no of Courses: 3</v-card-subtitle>
            <v-card-text class="m-0 mt-4 p-0 pl-8">
              <v-row class="mx-3 my-1">
                <v-col class="m-0 p-0 pl-4 text-left" cols="8"
                  >Published :</v-col
                >
                <v-col class="m-0 p-0 text-left" cols="4">1000</v-col>
              </v-row>
              <v-row class="mx-2 my-1">
                <v-col class="m-0 p-0 pl-4 text-left" cols="8"
                  >Unpublished :</v-col
                >
                <v-col class="m-0 p-0 text-left" cols="4">1000</v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-block text-center">
              <v-btn
                size="small"
                class="m-1"
                elevation="2"
                @click="publishedCourses"
                >View Published Courses
              </v-btn>
              <v-btn
                size="small"
                class="m-1"
                elevation="2"
                @click="unPublishedCourses"
                >View Unpublished Courses
              </v-btn>
              <v-btn size="small" class="m-1" elevation="2" @click="allCourses"
                >View All Courses
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          cols="10"
          sm="6"
          md="4"
          lg="3"
          class="m-4"
          style="min-width: 26%"
        >
          <v-card elevation="4">
            <v-card-title class="mt-3 yelloText">Instructors</v-card-title>
            <v-card-subtitle>Total no of Instructors: 3</v-card-subtitle>
            <v-card-text class="m-0 mt-4 p-0 pl-8">
              <v-row class="mx-3 my-1">
                <v-col class="m-0 p-0 pl-4 text-left" cols="8"
                  >With published Courses :</v-col
                >
                <v-col class="m-0 p-0 text-left" cols="4">1000</v-col>
              </v-row>
              <v-row class="mx-2 my-1">
                <v-col class="m-0 p-0 pl-0 text-left" cols="8"
                  >Without published Courses :</v-col
                >
                <v-col class="m-0 p-0 text-left" cols="4">1000</v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-block text-center">
              <v-btn
                size="small"
                class="m-0 my-1"
                elevation="2"
                @click="publishedCoursesInstructors"
                >View Instructors (Published Courses)
              </v-btn>
              <v-btn
                size="small"
                class="m-0 my-1"
                elevation="2"
                @click="unPublishedCoursesInstructors"
                >View Instructors (no Published Courses)
              </v-btn>
              <v-btn
                size="small"
                class="m-1"
                elevation="2"
                @click="allInstructors"
                >View All Instructors
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          cols="10"
          sm="6"
          md="4"
          lg="3"
          class="m-4"
          style="min-width: 26%"
        >
          <v-card elevation="4">
            <v-card-title class="mt-3 yelloText">Students</v-card-title>
            <v-card-subtitle>Total no of Students: 3</v-card-subtitle>
            <v-card-text class="m-0 mt-4 p-0 pl-8">
              <v-row class="mx-3 my-1">
                <v-col class="m-0 p-0 pl-4 text-left" cols="8"
                  >Purchased Courses :</v-col
                >
                <v-col class="m-0 p-0 text-left" cols="4">1000</v-col>
              </v-row>
              <v-row class="mx-2 my-1">
                <v-col class="m-0 p-0 pl-4 text-left" cols="8"
                  >Not Purchased Courses :</v-col
                >
                <v-col class="m-0 p-0 text-left" cols="4">1000</v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-block text-center">
              <v-btn
                size="small"
                class="m-1"
                elevation="2"
                @click="PurchasedCoursesStudents"
                >View Students (Purchased Courses)
              </v-btn>
              <v-btn
                size="small"
                class="m-1"
                elevation="2"
                @click="UnpurchasedCoursesStudents"
                >View Students (Unpurchased Courses)
              </v-btn>
              <v-btn size="small" class="m-1" elevation="2" @click="allStudents"
                >View All Students
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div>
      <component :is="selectedComponent" :key="selectedComponent"></component>
    </div>
    <!-- end of container -->
    <v-spacer style="margin-top: 12.5%"></v-spacer>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import NavBar from "../../components/common/navBar.vue";
import { mapGetters } from "vuex";
import ViewCourses from "@/components/Admin/Tables/viewCourses.vue";
import ViewInstructors from "@/components/Admin/Tables/viewInstructors.vue";
import ViewStudents from "@/components/Admin/Tables/viewStudents.vue";
import CourseDialog from "@/components/Admin/Dialogs/courseDialog.vue";

// Components

export default defineComponent({
  components: {
    NavBar,
    ViewCourses,
    ViewInstructors,
    ViewStudents,
    CourseDialog,
  },

  computed: {
    ...mapGetters(["instructor/allCoursesGetter"]),
  },

  data() {
    return {
          selectedComponent: "",
          dialog: false,
          show: false,
          dialogComponent: '',
          dialog: false,

    };
  },

  methods: {
    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
/////////////////////////////////COURSES///////////////////////////////////////////////////////////////
        async publishedCourses() {
              await this.$store.dispatch('admin/publishedCoursesAction');
              await this.$store.commit('admin/navTitleMutation', 'View Published Courses')
      this.selectedComponent = "ViewCourses";
    },
    async unPublishedCourses() {
          await this.$store.dispatch('admin/unPublishedCoursesAction');
          await this.$store.commit('admin/navTitleMutation', 'View Unpublished Courses')
      this.selectedComponent = "ViewCourses";
    },
    async allCourses() {
          await this.$store.dispatch('admin/allCoursesAction');
          await this.$store.commit('admin/navTitleMutation', 'View All Courses')
      this.selectedComponent = "ViewCourses";
    },
//////////////////////////////////////////INSTRUCTORS/////////////////////////////////////////////////////
        async publishedCoursesInstructors() {
            await this.$store.dispatch('admin/pcInstructorsAction');
          await this.$store.commit('admin/navTitleMutation', 'View Instructors with Published Courses')
      this.selectedComponent = "ViewInstructors";
    },
        async unPublishedCoursesInstructors() {
            await this.$store.dispatch('admin/upcInstructorsAction');
          await this.$store.commit('admin/navTitleMutation', 'View Instructors with no Published Courses')
      this.selectedComponent = "ViewInstructors";
    },
        async allInstructors() {
            await this.$store.dispatch('admin/allInstructorsAction');
          await this.$store.commit('admin/navTitleMutation', 'View All Instructors')
      this.selectedComponent = "ViewInstructors";
    },
//////////////////////////////////////////STUDENTS//////////////////////////////////////////////////////////
        async PurchasedCoursesStudents() {
            await this.$store.dispatch('admin/pcStudentsAction');
          await this.$store.commit('admin/navTitleMutation', 'View Students with Purchased Course')
      this.selectedComponent = "ViewStudents";
    },
        async UnpurchasedCoursesStudents() {
            await this.$store.dispatch('admin/upcStudentsAction');
          await this.$store.commit('admin/navTitleMutation', 'View Students with no Purchased Course')
      this.selectedComponent = "ViewStudents";
    },
        async allStudents() {
            await this.$store.dispatch('admin/allStudentsAction');
          await this.$store.commit('admin/navTitleMutation', 'View All Students')
      this.selectedComponent = "ViewStudents";
        },

        async logout() {
            await this.$store.dispatch('admin/logout');
            this.$router.push('/')

        }

  },

      mounted() {
    this.show = localStorage.getItem('role') === 'admin'
  },
});
</script>
  
  <style scoped>
.contain {
  text-align: center;
  margin-top: -20px;
}

.navi {
  /* margin-left: 4%; */
  width: 100%;
  margin-top: 20px;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.yelloText {
  text-shadow: -3px 1px 5px rgb(230, 230, 0);
}
</style>
  