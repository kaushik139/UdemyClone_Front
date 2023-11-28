<template>
  <div class="contain">
    <nav-bar></nav-bar>

    <!-- <div style="transform: scaleY(0.7); height: 400px; margin-top: -5px; padding: 0px;" class="bg-danger"> -->

    <carousel-view
      style="transform: scaleY(0.7); margin-top: -90px; margin-bottom: 0px"
    ></carousel-view>
    <!-- </div> -->
    <!-- purchased Courses -->
    <v-card class="mx-2" style="margin-top: -70px" elevation="6">
      <span style="font-size: 25px; color: purple">My Courses</span>

      <!-- view courses -->
      <v-row v-if="MyCoursesArray.length" class="m-0 mt-2 mb-10">
        <!-- List of courses -->
        <v-col cols="3" v-for="(course, index) in MyCoursesArray" :key="index">
          <v-card :elevation="isHovering ? 24 : 6" style="height: 110%">
            <!-- course with images -->
            <v-row class="" elevation="2" style="margin-left: 5%; width: 90%">
              <img
                v-if="course.images.bgImage"
                :src="'http://localhost:3000/Images/' + course.images.bgImage"
                alt="NO Image"
                style="width: 100%; height: 200px; margin-top: 7%"
              />
              <!-- without Images -->
              <img
                v-else
                :src="require(`@/assets/logo.svg`)"
                alt="NO Image"
                style="width: 100%; height: 200px; margin: 0px; margin-top: 15px;"
              />
              <!-- title -->
              <v-row
                class="mt-2 ml-0 mr-1 text-dark"
                style="display: flex; flex-direction: column"
              >
                <h5>{{ toTitleCase(course.title) }}</h5>
                <h6>{{ shorten(course.description.miniDescription) }}</h6>

                <!-- view course button -->
                <v-btn
                  width="70%"
                  style="margin: auto; margin-bottom: 3%"
                  color="purple"
                  size="small"
                  @click="viewCourse(course, 'purchased')"
                  >Go to Course</v-btn
                >
              </v-row>
            </v-row>
            <!-- course end -->
          </v-card>
        </v-col>
        <!-- courses diplay end -->
      </v-row>

      <!-- not purchased any course Yet! -->
      <v-row v-else class="m-2 text-grey-darken-2 d-block">
        Please purchase a course!</v-row
      >
    </v-card>

    <!-- buy Courses -->
    <v-card class="mx-2 my-8" elevation="6">
      <span style="font-size: 25px; color: purple">Buy Courses</span>
      <!-- view courses -->
      <v-row class="m-0 mt-2 mb-10">
        <!-- List of courses -->
        <v-col cols="3" v-for="(course, index) in CoursesArray" :key="index">
          <v-card :elevation="isHovering ? 24 : 6" style="height: 110%">
            <!-- course with images -->
            <v-row class="" elevation="2" style="margin-left: 5%; width: 90%">
              <img
                v-if="course.images.bgImage"
                :src="'http://localhost:3000/Images/' + course.images.bgImage"
                alt="NO Image"
                style="width: 100%; height: 200px; margin-top: 7%"
              />
              <!-- without Images -->
              <img
                v-else
                :src="require(`@/assets/logo.svg`)"
                alt="NO Image"
                style="width: 100%; height: 200px; margin: 0px; margin-top: 15px;"
              />
              <!-- title -->
              <v-row
                class="mt-2 ml-0 mr-1 text-dark"
                style="display: flex; flex-direction: column"
              >
                <h5>{{ toTitleCase(course.title) }}</h5>
                <h6>{{ shorten(course.description.miniDescription) }}</h6>
                <v-card
                  v-if="
                    !course.enrollment.filter((x) => x.studentID === id).length
                  "
                  elevation="0"
                >
                  <!-- pricing -->
                  <v-row class="mt-1" style="margin-bottom: -45px">
                    <!-- base -->
                    <v-col cols="3" class="p-0 pt-3">
                      <v-icon
                        class="mdi-currency-inr mdi ml-1"
                        size="small"
                        color="grey"
                        style="display: inline"
                        >{{ mdiCurrencyInr }}</v-icon
                      >
                      <h6
                        style="
                          text-decoration: line-through;
                          color: grey;
                          display: inline;
                        "
                      >
                        {{ course.price.basePrice }}
                      </h6>
                    </v-col>
                    <v-col cols="5" class="pl-0">
                      <v-icon class="mdi-currency-inr mdi">{{
                        mdiCurrencyInr
                      }}</v-icon>
                      <h5 class="text" style="display: inline">
                        {{ course.price.finalAmount }}
                      </h5>
                    </v-col>
                    <v-col
                      cols="4"
                      style="font-size: 12px; padding-left: 0px; margin-top: 2%"
                    >
                      <div>
                        {{
                          Math.floor(
                            ((course.price.basePrice -
                              course.price.finalAmount) /
                              course.price.basePrice) *
                              100
                          )
                        }}
                        % OFF
                      </div>
                    </v-col>
                  </v-row>

                  <v-row class="mt-5">
                    <!-- enroll -->
                    <v-col cols="5">
                      <!-- enroll button -->
                      <v-btn
                        class="p-6 mt-1"
                        color="purple"
                        size="small"
                        @click="viewCourse(course, 'view')"
                        >Enroll</v-btn
                      >
                    </v-col>
                    <!-- rating -->
                    <v-col cols="6">
                      <v-rating
                        half-increments
                        hover
                        readonly
                        :length="5"
                        :size="20"
                        :model-value="course.rating.netRating"
                        color="warning"
                        active-color="warning"
                      />
                    </v-col>
                    <!-- enroll end -->
                  </v-row>
                </v-card>
                <v-card v-else elevation="0">
                  <h6 class="text-green">Already Purchased!</h6>
                  <v-btn
                    width="70%"
                    style="margin: auto; margin-bottom: 3%"
                    color="purple"
                    size="small"
                    @click="viewCourse(course, 'purchased')"
                    >Go to Course</v-btn
                  >
                </v-card>
              </v-row>
            </v-row>
            <!-- course end -->
          </v-card>
        </v-col>
        <!-- courses diplay end -->
      </v-row>
    </v-card>

    <!-- view Courses modal -->
    <view-course-page
      :data="courseData"
      :key="courseData.dialog"
    ></view-course-page>
  </div>
</template>

<script>
import CarouselView from "@/components/common/carouselView.vue";
import ViewCoursePage from "@/components/common/viewCoursePage.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import NavBar from "../../components/common/navBar.vue";

// Components

export default defineComponent({
  name: "HomeView",
  components: { NavBar, ViewCoursePage, CarouselView },

  computed: {
    ...mapGetters(["student/getCourses", "student/getMyCourses"]),
    id() {
      try {
        const _id = this.$store.state.auth.userData?.user?._id || null;
        return _id
      } catch (error) {
        return null;
      }
    },
  },

  data() {
    return {
      a: "data",
      page: 0,
      imgURL: null,
      CoursesArray: [],
      MyCoursesArray: [],
      courseData: {
        dialog: false,
      },
      viewVideos: 0,
      viewExercises: 0,
      viewImgURL: "",
      menu: false,
      aa: false,
    };
  },

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

    shorten(val) {
      if (val.length > 15) {
        const newVal = (val.substring(0, 15) + '...');
        return newVal;
      }
      else return val;
    },

    async viewCourse(course, action) {
      if (course && action) {
        for (let i = 0; i < course.sections.length; i++) {
          this.viewVideos +=
            course.sections[i].videos.length > 0
              ? course.sections[i].videos.length
              : 0;
          this.viewExercises +=
            course.sections[i].exercises.length > 0
              ? course.sections[i].exercises.length
              : 0;
        }
        this.courseData = {
          Course: course,
          noOfVideos: this.viewVideos,
          noOfExercises: this.viewExercises,
          dialog: true,
          user: "student",
          // ImgUrl: ImgUrl,
          ImgURL: `http://localhost:3000/Images/${course.images.bgImage}`,
          action: action,
        };
      }
    },

    async isPurchased(enrollment) {
      for (let i = 0; i < enrollment.length; i++) {
        console.log(enrollment[i].studentID);
        console.log(this.id);
        if (enrollment[i].studentID === this.id) {
          console.log("F");
          return false;
        }
      }
      return true;
    },

    /**
     *
     * @param {*} page
     */
    async mount(page) {
      await this.$store.dispatch(
        "student/getMyCourses",
        localStorage.getItem("email")
      );
      await this.$store.dispatch("student/fetchAllCourses", page);

      if (this["student/getCourses"]) {
        this.CoursesArray = this["student/getCourses"];
      }
      if (this["student/getMyCourses"]) {
        this.MyCoursesArray = this["student/getMyCourses"];
      }
      // console.log(this.CoursesArray);
      console.log(this.MyCoursesArray);
    },
  },
  /**
   *
   */
  mounted() {
    this.mount(0);
  },
});
</script>
