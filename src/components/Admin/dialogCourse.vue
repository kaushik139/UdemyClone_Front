      <!-- view Course Modal -->
      <template>
  <v-row justify="center">
    <v-dialog
      v-model="data.dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- background-color: rgb(131, 0, 0); -->

        <v-btn
          variant="text"
          @click="data.dialog = false"
          style="
            color: white;
            border-radius: 50px;
            margin-left: auto;
            margin-top: 1%;
            margin-right: 1%;
            background-color: grey;
          "
          append-icon="mdi-close-circle-outline"
        >
          Close
        </v-btn>

        <!-- content -->
        <v-row>
          <!-- image -->
          <v-col cols="6" class="m-4 mr-0 ml-12">
            <v-card elevation="4" height="100%" width="100%" rounded="4">
              <v-row style="height: 70%; width: 95%; margin: auto;">
                <img
                  :src="imgURl"
                  alt="Course Image"
                  style="height: 100%; width: 100%; border-radius: 20px;"
                />
              </v-row>
              <v-row v-if="description.fullDescription" class="mt-12" style="margin: auto; width: 95%;">
                {{ description.fullDescription }}
              </v-row>
              <v-row v-else class="mt-12" style="margin: auto; padding-left: 35%; width: 95%;">No Description!</v-row>
            </v-card>
          </v-col>
          <!-- text data -->
          <v-col cols="5" class="m-4 ml-0 mr-0">
            <!-- row1 -->
            <v-row class="mt-4">
              <v-col cols="3" class="m-0 mr-0 pr-0 ml-5">
                <h4>Title:</h4>
              </v-col>
              <v-col cols="8" class="m-0 ml-0">
                <h4>{{ toTitleCase(CourseGetter.title) }}</h4>
              </v-col>
            </v-row>

            <!-- row2 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Description:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">
                  {{ description }}
                </h6>
              </v-col>
            </v-row>

            <!-- row3 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Category:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ category }}</h6>
              </v-col>
            </v-row>

            <!-- row4 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Sections:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ numOSections }}</h6>
              </v-col>
            </v-row>

            <!-- row5 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Videos:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ numOVideos }}</h6>
              </v-col>
            </v-row>

            <!-- row6-->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Exercises:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ numOfExercises }}</h6>
              </v-col>
            </v-row>

            <!-- row7-->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Status:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ toTitleCase(CourseGetter.status) }}</h6>
              </v-col>
            </v-row>

            <!-- row7.02-->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Price:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <v-icon class="mdi-currency-inr mdi mb-1">{{
                  mdiCurrencyInr
                }}</v-icon>
                <h6 style="display: inline">
                  {{finalAmount}}
                </h6>
              </v-col>
            </v-row>

            <!-- row8-->
            <v-row class="m-0">
              <!-- v-if="
                      data.user === 'instructor' && data.Course.status === 'published'
                    " -->
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Enrolled:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ enrolled }}</h6>
              </v-col>
            </v-row>

            <!-- row9-->
            <v-row class="ml-5 mt-0">
              <v-col cols="4" class="mt-2">
                <h6 class="m-0 p-0">Rating:</h6>
              </v-col>
              <v-col cols="2" class="mt-3 ml-1">
                <h6 v-if="rating" class="m-0 p-0"> {{ rating }}</h6>
                <h6 v-else class="m-0 p-0"> 0 </h6>
              </v-col>
              <v-col cols="5" class="m-0 mt-1">
                <div class="text-center">
                  <v-rating
                    color="purple-darken-3"
                    disabled
                    density="comfortable"
                    half-increments
                    v-model="rating"
                  ></v-rating>
                  <!-- <pre>{{ data.Course.rating.netRating  }}</pre> -->
                </div>
              </v-col>
            </v-row>

            <!-- row10-->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Revenue:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <v-icon class="mdi-currency-inr mdi mb-1">{{
                  mdiCurrencyInr
                }}</v-icon>
                <h6 style="display: inline">{{ Revenue }}</h6>
              </v-col>
            </v-row>

            <!-- row12-->
            <v-row class="m-0 mt-4 ml-12">
              <v-btn color="grey-darken-2" @click="review"
                >Review Course</v-btn
              >
            </v-row>


            <!-- end of list -->
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>
            
        
        <script>
import axios from "axios";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "ViewCoursePage",
  components: {},

  props: {
    data: Object,
  },

  computed: {
    ...mapGetters("admin", ["CourseGetter", "getInstructor"]),

    imgURl() {
      if (this.CourseGetter.images)
        return `http://localhost:3000/Images/${this.CourseGetter.images.bgImage}`;
    },
    description() {
      if (this.CourseGetter.description)
        return this.CourseGetter.description.miniDescription;
      else return "";
    },
    category() {
      if (this.CourseGetter.category) return this.CourseGetter.category;
      else return "";
    },
    numSections() {
      if (this.CourseGetter.Sections) {
        // console.log(this.CourseGetter.sections.length);
        return this.CourseGetter.sections.length;
      } else return 0;
    },
    numVideos() {
      const videos = 0;
      if (this.CourseGetter.Sections) {
        for (let i = 0; i < this.CourseGetter.Sections.length; i++) {
          videos += this.CourseGetter.Sections[i].videos.length;
        }
        return videos;
      } else return 0;
    },
  },

  data() {
    return {
      course: {},
      numOSections: 0,
      numOVideos: 0,
      numOfExercises: 0,
      finalAmount: 0,
              enrolled: 0,
              rating: 0,
              Revenue: 0,
      

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

    async review() {
      // console.log('data');
      localStorage.setItem("CourseID", this.CourseGetter._id);
      await this.$store.dispatch("player/coursePlayAction");
      this.$router.push("/player");
    },

    async purchase(courseID) {
      await this.$store.dispatch("student/Purchase", { courseID: courseID });

      // const res = await axios.post(`http://localhost:3000/students/purchase/${courseID}`);
      // window.location.href = res.data.url;
    },
  },

  async mounted() {
    // this.data.dialog = true;
    // console.log(this.data);
    //   if (this.data.action === "search") {
    //   } else {
    //     if (localStorage.getItem("roles") === "students") {
    //       this["student/getSelectedCourse"];
    //     } else {
    //       if (this.data) this.componentData = this.data;
    //       else console.log(this["student/getSelectedCourse"]);
    //     }
    //   }

    // console.log(this.data.id);
    if (this.data.id) {
      await this.$store.dispatch("admin/getCourseAction", this.data.id);
      await this.$store.dispatch(
        "admin/instructordetails",
        this.CourseGetter.instructor
      );
      console.log(this.CourseGetter);
      this.numOSections = this.CourseGetter.sections.length;
      for (let i = 0; i < this.numOSections; i++) {
        this.numOVideos += this.CourseGetter.sections[i].videos.length;
        this.numOfExercises += this.CourseGetter.sections[i].exercises.length;
      }
              this.finalAmount = this.CourseGetter.price.finalAmount;
              this.enrolled = this.CourseGetter.enrollment.length;
              this.rating = this.CourseGetter.rating.netRating;
              this.Revenue = this.finalAmount * this.enrolled;
              // console.log(this.CourseGetter.enrollment);
      // console.log(this.getInstructor);
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
  margin-left: 2%;
  width: 96%;
  margin-top: 20px;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
        