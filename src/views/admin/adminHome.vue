<template>
  <div class="contain mt-0">
    <div class="text-left m-0 pl-2 d-flex" style="background:grey">
       <h2>Udemy@dmin</h2>
       <v-spacer></v-spacer>
       <v-btn class="mr-2 mt-1" append-icon="mdi-logout"  style="background-color:rgb(170, 169, 169)">Logout</v-btn>
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
import ViewCourses from "@/components/Admin/viewCourses.vue";
import ViewInstructors from "@/components/Admin/viewInstructors.vue";
import ViewStudents from "@/components/Admin/viewStudents.vue";

// Components

export default defineComponent({
  components: {
    NavBar,
    ViewCourses,
    ViewInstructors,
    ViewStudents,
  },

  computed: {
    ...mapGetters(["instructor/allCoursesGetter"]),
  },

  data() {
    return {
      selectedComponent: "",
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

    publishedCourses() {
      this.selectedComponent = "ViewCourses";
    },
    unPublishedCourses() {
      this.selectedComponent = "ViewCourses";
    },
    allCourses() {
      this.selectedComponent = "ViewCourses";
    },

    publishedCoursesInstructors() {
      this.selectedComponent = "ViewInstructors";
    },
    unPublishedCoursesInstructors() {
      this.selectedComponent = "ViewInstructors";
    },
    allInstructors() {
      this.selectedComponent = "ViewInstructors";
    },

    PurchasedCoursesStudents() {
      this.selectedComponent = "ViewStudents";
    },
    UnpurchasedCoursesStudents() {
      this.selectedComponent = "ViewStudents";
    },
    allStudents() {
      this.selectedComponent = "ViewStudents";
    },

    async mount() {},
  },

  mounted() {
    this.mount();
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
  