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
          class="badge"
          style="
            color: white;
            border-radius: 50px;
            max-width: 5px;
            margin-left: auto;
          "
          :style="{
            backgroundColor: bgColor,
          }"
        >
          Close
        </v-btn>

        <!-- content -->
        <v-row>
          <!-- image -->
          <v-col cols="6" class="m-4 mr-0 ml-12">
            <v-card elevation="4" height="100%" width="100%" rounded="4">
              <v-row style="height: 70%; width: 95%; margin: auto">
                <img
                  :src="data.ImgURL"
                  alt="Course Image"
                  style="height: 100%; width: 100%; border-radius: 20px"
                />
              </v-row>
              <v-row class="mt-12" style="margin: auto; width: 95%">
                {{ data.Course.description.fullDescription }}
              </v-row>
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
                <h4>{{ toTitleCase(data.Course.title) }}</h4>
              </v-col>
            </v-row>

            <!-- row2 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Description:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ data.Course.description.miniDescription }}</h6>
              </v-col>
            </v-row>

            <!-- row3 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Category:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ data.Course.category }}</h6>
              </v-col>
            </v-row>

            <!-- row4 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Sections:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ data.Course.sections.length }}</h6>
              </v-col>
            </v-row>

            <!-- row5 -->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Videos:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ data.noOfVideos }}</h6>
              </v-col>
            </v-row>

            <!-- row6-->
            <v-row class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Exercises:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ data.noOfExercises }}</h6>
              </v-col>
            </v-row>

            <!-- row7-->
            <v-row class="m-0" v-if="showStatus">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Status:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <h6 class="m-0 p-0">{{ toTitleCase(data.Course.status) }}</h6>
              </v-col>
            </v-row>

            <!-- row7.02-->
            <v-row v-if="data.action === 'view'" class="m-0">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Price:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <v-icon class="mdi-currency-inr mdi mb-1">{{
                  mdiCurrencyInr
                }}</v-icon>
                <h6 style="display: inline">
                  {{ data.Course.price.finalAmount }}
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
                <h6 class="m-0 p-0">{{ data.Course.enrollment.length }}</h6>
              </v-col>
            </v-row>

            {{ data.Course.rating }}
            <!-- row9-->
            <v-row class="ml-5 mt-0">
              <v-col cols="4" class="mt-2">
                <h6 class="m-0 p-0">Rating:</h6>
              </v-col>
              <v-col cols="2" class="mt-3 ml-1">
                <h6 class="m-0 p-0">{{ data.Course.rating.netRating }}</h6>
              </v-col>
              <v-col cols="5" class="m-0 mt-1">
                <div class="text-center">
                  <v-rating
                    color="purple-darken-3"
                    disabled
                    density="comfortable"
                    v-model="data.Course.rating.netRating"
                    half-increments
                  ></v-rating>
                  <!-- <pre>{{ data.Course.rating.netRating  }}</pre> -->
                </div>
              </v-col>
            </v-row>

            <!-- row10-->
            <v-row class="m-0" v-if="showRevenue">
              <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                <h6 class="m-0 p-0">Revenue:</h6>
              </v-col>
              <v-col cols="7" class="m-0 ml-0">
                <v-icon class="mdi-currency-inr mdi mb-1">{{
                  mdiCurrencyInr
                }}</v-icon>
                <h6 style="display: inline">{{ data.Revenue }}</h6>
              </v-col>
            </v-row>

            <!-- row11-->
            <v-row v-if="showPurchaseBtn" class="m-0 ml-12">
              <v-btn color="purple" @click="purchase(data.Course._id)"
                >Purchase Now!</v-btn
              >
              <!-- {{ data.Course.stripePriceID }} -->
            </v-row>

            <!-- row12-->
            <v-row v-if="showLearnBtn" class="m-0 mt-4 ml-12">
              <v-btn color="purple" @click="learn(data.Course._id)"
                >Learn Now</v-btn
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
    ...mapGetters("auth", ["userIDgetter"]),

    bgColor() {
      return localStorage.getItem("role") === "student"
        ? "purple"
        : "rgb(131,0,0)";
    },
    showStatus() {
      if (this.data.action === "search") {
        if (
          localStorage.getItem("role") === "instructors" &&
          this.data.instructor === this.userIDgetter
        ) {
          return true;
        } else return false;
      } else {
        return this.data.user === "instructor" ? true : false;
      }
    },
    showRevenue() {
      if (
        localStorage.getItem("role") === "instructors" &&
        this.data.instructor === this.userIDgetter
      )
        return true;
      else return false;
    },
    showPurchaseBtn() {
      if (this.data.action === "view" && this.data.user === "student")
        return true;
      else if (this.data.action === "search") {
        const res = localStorage.getItem('role') === "students" ? this.data.purchased ? false : true : false;
        return res;
      }
    },
    showLearnBtn() {
      // if (this.data.action === "purchased" && this.data.user === "student")
      //   return true;
      // else if (this.data.action === "search") {
      //   // console.log((this.data.purchased === undefined));
      //   return !(this.data.purchased === undefined);
      // }
      return localStorage.getItem('role') === "students" ? !this.showPurchaseBtn : false;
    },
  },

  data() {
    return {};
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

    async learn(data) {
      // console.log(data);
      localStorage.setItem("CourseID", data);
      await this.$store.dispatch("player/coursePlayAction");
      this.$router.push("/player");
    },

    async purchase(courseID) {
      await this.$store.dispatch("student/Purchase", { courseID: courseID });

      // const res = await axios.post(`http://localhost:3000/students/purchase/${courseID}`);
      // window.location.href = res.data.url;
    },
  },

  mounted() {
    // this.data.dialog = true;
    // console.log(this.data);
    if (this.data.action === "search") {
    } else {
      if (localStorage.getItem("roles") === "students") {
        this["student/getSelectedCourse"];
      } else {
        if (this.data) this.componentData = this.data;
        else console.log(this["student/getSelectedCourse"]);
      }
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
  