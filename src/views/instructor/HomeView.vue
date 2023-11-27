<template>
  <div class="contain">
    <nav-bar class="navi"></nav-bar>
    <div style="position: relative">
      <side-nav></side-nav>

      <!-- Published courses -->
      <v-container class="mt-6">
        <v-card v-if="publishedCoursesArray.length" class="p-0" elevation="4">
          <v-row class="text-center">
            <v-col cols="12">
              <h3 class="mb-12 mt-12">Your Published Courses:</h3>
              <ul
                type="none"
                v-for="(item, index) in publishedCoursesArray"
                :key="index"
              >
                <li v-if="item.status === 'published'">
                  <v-row class="m-2">
                    <v-col cols="3" class="">
                      <img
                        v-if="item.imgURL !== null"
                        :src="item.imgURL"
                        alt="Course Image"
                        style="max-width: 170px; min-height: 100px"
                      />
                      <img
                        v-else
                        class="border"
                        alt="No Image Available"
                        style="max-width: 170px; min-height: 100px"
                      />
                    </v-col>

                    <!-- <v-col cols="1" class="mt-4" style="text-align: right;">
                  <span class="inline h4">{{ index+1 }}.</span>
              </v-col> -->

                    <v-col cols="5" class="mt-4" style="text-align: left">
                      <span class="inline h4"
                        >{{ index + 1 }}. {{ toTitleCase(item.title) }}</span
                      >
                    </v-col>

                    <v-col cols="1">
                      <v-btn
                        class="btn mt-6"
                        @click="view(index, 'publishedCoursesArray')"
                        >View</v-btn
                      >
                    </v-col>

                    <v-col cols="1">
                      <v-btn
                        class="btn mt-6"
                        @click="edit(index, 'publishedCoursesArray')"
                        >Edit</v-btn
                      >
                    </v-col>
                  </v-row>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card>

        <!-- No Courses -->
        <v-card
          v-else
          style="text-align: center; color: rgb(187, 85, 85)"
          elevation="4"
        >
          <h4>No Courses Published !</h4>
        </v-card>
      </v-container>

      <!-- draft courses -->
      <v-container class="mt-4 pt-5 mb-4">
        <v-card v-if="draftCoursesArray" elevation="4" class="m-6">
          <v-row class="text-center">
            <v-col cols="12">
              <h3 class="mb-12 mt-12">Your Draft Courses:</h3>
              <ul
                type="none"
                v-for="(item, index) in draftCoursesArray"
                :key="index"
              >
                <li
                  v-if="item.status === 'draft' || item.status === 'requested'"
                >
                  <v-row class="m-2" style="gap: 15px">
                    <v-col cols="3" class="">
                      <img
                        v-if="item.imgURL !== null"
                        :src="item.imgURL"
                        alt="Course Image"
                        style="max-width: 170px; min-height: 100px"
                      />
                      <img
                        v-else
                        class="border"
                        alt="No Image Available"
                        style="max-width: 170px; min-height: 100px"
                      />
                    </v-col>

                    <!-- <v-col cols="1" class="mt-4" style="text-align: right;">
                   <span class="inline h4">{{ index+1 }}.</span>
               </v-col> -->

                    <v-col cols="5" class="mt-4" style="text-align: left">
                      <span class="inline h4"
                        >{{ index + 1 }}. {{ toTitleCase(item.title) }}</span
                      >
                    </v-col>

                    <v-col cols="1">
                      <v-btn
                        v-if="item.status === 'draft'"
                        class="btn mt-6"
                        style="padding: 5px !important"
                        >Publish

                        <!-- Modal dialog -->
                        <v-dialog
                          v-model="dialog"
                          width="50%"
                          activator="parent"
                          style="z-index: 999"
                        >
                          <v-card style="text-align: center">
                            <v-card-title>
                              Publish Course: {{ index + 1 }}.
                              {{ draftCoursesArray[index].title }}
                            </v-card-title>

                            <!-- Form inside the modal -->
                            <v-card-text>
                              <v-form>
                                <div>
                                  <v-btn
                                    class="btn"
                                    @click="
                                      requestPublish(
                                        draftCoursesArray[index].id
                                      )
                                    "
                                    >Request Publishing</v-btn
                                  >
                                </div>
                              </v-form>
                            </v-card-text>

                            <v-card-actions>
                              <v-btn
                                color="rgb(250, 100, 50)"
                                @click="dialog = false"
                                >Close</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-btn>

                      <span
                        v-if="item.status === 'requested'"
                        disabled
                        class="btn mt-6"
                        style="
                          color: rgb(255, 255, 255);
                          margin-left: -40%;
                          background-color: rgb(244, 167, 147);
                        "
                        >Requested</span
                      >
                    </v-col>

                    <v-col cols="1">
                      <v-btn
                        class="btn mt-6"
                        @click="view(index, 'draftCoursesArray')"
                        >View</v-btn
                      >
                    </v-col>

                    <v-col cols="1">
                      <v-btn
                        class="btn mt-6"
                        @click="edit(index, 'draftCoursesArray')"
                        >Edit</v-btn
                      >
                    </v-col>
                  </v-row>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card>

        <!-- No Courses -->
        <v-card v-else style="text-align: center; color: rgb(187, 85, 85)">
          <h4>No Draft Courses!</h4>
        </v-card>
      </v-container>

      <view-course-page
        :data="courseData"
        :key="courseData.dialog"
      ></view-course-page>
    </div>
    <!-- end of container -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SideNav from "../../components/instructor/sideNav.vue";
import NavBar from "../../components/common/navBar.vue";
import { mapGetters } from "vuex";
import ViewCoursePage from "@/components/common/viewCoursePage.vue";

// Components

export default defineComponent({
  name: "HomeView",
  components: {
    SideNav,
    NavBar,
    ViewCoursePage,
  },

  computed: {
    ...mapGetters(["instructor/allCoursesGetter"]),
  },

  data() {
    return {
      a: "data",
      draftCoursesArray: [],
      publishedCoursesArray: [],
      dialog: false,
      courseToPublishIndex: null,
      draft: 0,
      dialog2: false,
      viewCourse: {},
      viewImgURL: "",
      viewVideos: 0,
      viewExercises: 0,
      viewRevenue: 0,
      courseData: {
        dialog: false,
      },
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

    /**
     *
     * @param {*} index
     */
    async view(index, arr) {
      // this.dialog2 = true;
      this.viewCourse = this["instructor/allCoursesGetter"].filter((item) => {
        if (item._id === this[arr][index].id) return item;
      });
      this.viewImgURL = `http://localhost:3000/Images/${this.viewCourse[0].images.bgImage}`;
      if (this.viewCourse[0].sections.length > 0) {
        for (let i = 0; i < this.viewCourse[0].sections.length; i++) {
          this.viewVideos +=
            this.viewCourse[0].sections[i].videos.length > 0
              ? this.viewCourse[0].sections[i].videos.length
              : 0;
          this.viewExercises +=
            this.viewCourse[0].sections[i].exercises.length > 0
              ? this.viewCourse[0].sections[i].exercises.length
              : 0;
        }

        this.viewRevenue =
          (this.viewCourse[0].price.finalAmount -
            this.viewCourse[0].price.tax) *
          this.viewCourse[0].enrollment.length;
      }

      this.courseData = {
        Course: this.viewCourse[0],
        ImgURL: this.viewImgURL,
        noOfVideos: this.viewVideos,
        noOfExercises: this.viewExercises,
        Revenue: this.viewRevenue,
        dialog: true,
        user: "instructor",
      };
    },

    /**
     *
     * @param {*} index
     * @param {*} arr
     */
    async edit(index, arr) {
      localStorage.setItem("courseDraft", this[arr][index].id);
      await this.$store.dispatch(
        "instructor/getDraftCourse",
        this[arr][index].id
      );
      await this.$store.commit("instructor/changeCurrentComp", "PlanCourse");
      await this.$router.push("/create");
    },

    /**
     *
     * @param {*} ID
     */
    requestPublish(ID) {
      console.log(ID);
      this.$store.dispatch("instructor/Publish", ID);
      this.showModal = false;
      this.mount();
    },

    async mount() {
      let draftCoursesArray1 = [];
      let publishedCoursesArray1 = [];
      await this.$store.dispatch(
        "instructor/AllMyCourses",
        localStorage.getItem("email")
      );
      for (let i = 0; i < this["instructor/allCoursesGetter"].length; i++) {
        //temporary Array for unPublished Courses
        if (
          this["instructor/allCoursesGetter"][i].status === "draft" ||
          this["instructor/allCoursesGetter"][i].status === "requested"
        ) {
          draftCoursesArray1.push({
            id: this["instructor/allCoursesGetter"][i]._id,
            title: this["instructor/allCoursesGetter"][i].title,
            imgURL:
              this["instructor/allCoursesGetter"][i].images.bgImage !== null
                ? `http://localhost:3000/Images/${this["instructor/allCoursesGetter"][i].images.bgImage}`
                : null,
            status: this["instructor/allCoursesGetter"][i].status,
          });
        }
        // temporary array for published courses
        if (this["instructor/allCoursesGetter"][i].status === "published") {
          publishedCoursesArray1.push({
            id: this["instructor/allCoursesGetter"][i]._id,
            title: this["instructor/allCoursesGetter"][i].title,
            imgURL:
              this["instructor/allCoursesGetter"][i].images.bgImage !== null
                ? `http://localhost:3000/Images/${this["instructor/allCoursesGetter"][i].images.bgImage}`
                : null,
            status: this["instructor/allCoursesGetter"][i].status,
          });
        }
      }
      // setting arrays to display using temp arrays; helps while 'requesting publish', to refresh DOM without reloading
      this.publishedCoursesArray = publishedCoursesArray1;
      this.draftCoursesArray = draftCoursesArray1;
      // console.log(this.Courses);
    },
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
  margin-left: 4%;
  width: 96%;
  margin-top: 20px;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

</style>
