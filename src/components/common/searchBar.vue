<template>
  <form
    @submit.prevent="search"
    class="d-flex border border-1 border-dark rounded-pill p-0"
    style="background-color: white !important"
    role="search"
  >
    <input
      v-model="searchText"
      class="form-control me-2 rounded-pill search"
      type="search"
      placeholder="Search"
      aria-label="Search"
      style="border: none"
    />
    <button class="btn p-0 m-0">
      <i
        class="fa-solid fa-magnifying-glass"
        style="color: #000000; margin-right: 8px"
      ></i>

      <v-menu activator="parent" class="">
        <v-list style="width: 30vw; margin-top: 5px; padding: 0px">
          <v-list-item
            v-for="(item, index) in searchResultsGetter"
            :key="index"
            :value="index"
            class="p-0 m-0"
            @click="showCourse(item.id)"
          >
            <v-list-item-title class="m-0 mt-6 pl-4">
              <v-row>
                <v-col cols="7" class="">
                  {{ toTitleCase(item.title) }}
                </v-col>
                <v-col cols="1"></v-col>
                <v-col
                  cols="3"
                  class="text-grey-darken-2"
                  style="font-size: 12px"
                  >-{{ toTitleCase(item.instructor) }}</v-col
                >
              </v-row>
            </v-list-item-title>
            <v-divider
              style="width: 120%; margin: 0px; padding: 0px"
            ></v-divider>
          </v-list-item>
        </v-list>
      </v-menu>
    </button>
  </form>

  <view-course-page
    :data="courseData"
    :key="courseData.dialog"
  ></view-course-page>
</template>

<script>
import { mapGetters } from "vuex";
import viewCoursePage from "./viewCoursePage.vue";

export default {
  components: { viewCoursePage },

  computed: {
    ...mapGetters("search", ["searchResultsGetter", "showCourseGetter"]),
...mapGetters("auth", ["userIDgetter"]),
  },

  data: () => ({
    searchText: "",
    courseData: {
      dialog: false,
      },
      viewImgURL: "",
      viewVideos: 0,
      viewExercises: 0,
      viewRevenue: 0,
      
  }),

  methods: {
    /**
     *
     * @param {*} value
     */
    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    async search() {
      // console.log(this.searchText);
      await this.$store.dispatch("search/searchAction", this.searchText);

    },

    async showCourse(courseID) {
      // console.log(courseID);
      await this.$store.dispatch("search/showCourseAction", courseID);

        if (this.showCourseGetter) {
            for (let i = 0; i < this.showCourseGetter.sections.length; i++) {
                this.viewVideos +=
                    this.showCourseGetter.sections[i].videos.length > 0
                        ? this.showCourseGetter.sections[i].videos.length
                        : 0;
                this.viewExercises +=
                    this.showCourseGetter.sections[i].exercises.length > 0
                        ? this.showCourseGetter.sections[i].exercises.length
                        : 0;
            }

            this.viewRevenue =
                (this.showCourseGetter.price.finalAmount -
                    this.showCourseGetter.price.tax) *
                this.showCourseGetter.enrollment.length;

            const isPurchased = this.showCourseGetter.enrollment.find(item => item.studentID == this.userIDgetter);
            const isOwned = isPurchased ? true : false;

            this.courseData = {
                Course: this.showCourseGetter,
                noOfVideos: this.viewVideos,
                noOfExercises: this.viewExercises,
                dialog: true,
                user: "search",
                ImgURL: `http://localhost:3000/Images/${this.showCourseGetter.images.bgImage}`,
                action: "search",
                instructor: this.showCourseGetter.instructor,
                Revenue: this.viewRevenue,
                purchased: isOwned,

            }
        }
      }
      
       


  },

  mounted() {},
};
</script>

<style scoped>
.search:focus {
  box-shadow: none;
}
</style>