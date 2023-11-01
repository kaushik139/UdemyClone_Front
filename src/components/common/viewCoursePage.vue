      <!-- view Course Modal -->
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="data.dialog"
            fullscreen
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-btn
                variant="text"
                @click="data.dialog = false"
                class="badge"
                style="
                  background-color: rgb(131, 0, 0);
                  color: white;
                  border-radius: 50px;
                  max-width: 5px;
                  margin-left: auto;
                "
              >
                Close
              </v-btn>
  
              <!-- content -->
              <v-row>
                <!-- img -->
                <v-col cols="6" class="m-4 mr-0 ml-12">
                  <v-row style="height: 70%;">
                    <img
                    :src="data.ImgURL"
                    alt="Course Image"
                    style="height: 100%; width: 100%; border-radius: 20px"
                  />
                  </v-row>
                  <v-row class="mt-12">
                    {{ data.Course.description.fullDescription }}
                  </v-row>
                </v-col>
                <!-- text data -->
                <v-col cols="5" class="m-4 ml-0 mr-0">
                  <!-- row1 -->
                  <v-row class="mt-4">
                    <v-col cols="3" class="m-0 mr-0 pr-0 ml-5">
                      <h4>Title:</h4>
                    </v-col>
                    <v-col cols="8" class="m-0 ml-0">
                      <h4>{{data.Course.title }}</h4>
                    </v-col>
                  </v-row>
  
                  <!-- row2 -->
                  <v-row class="m-0">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Description:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ data.Course.description.miniDescription }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row3 -->
                  <v-row class="m-0">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Category:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ data.Course.category }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row4 -->
                  <v-row class="m-0">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Sections:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ data.Course.sections.length }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row5 -->
                  <v-row class="m-0">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Videos:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ data.noOfVideos }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row6-->
                  <v-row class="m-0">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Exercises:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ data.noOfExercises }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row7-->
                  <v-row class="m-0" v-if="data.user === 'instructor'">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Status:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ toTitleCase(data.Course.status) }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row7-->
                  <v-row class="m-0">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Price:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <v-icon class="mdi-currency-inr mdi mb-1">{{
                        mdiCurrencyInr
                      }}</v-icon>
                      <h5 style="display: inline">
                        {{ data.Course.price.finalAmount }}
                      </h5>
                    </v-col>
                  </v-row>
  
                  <!-- row8-->
                  <v-row class="m-0" v-if="data.user === 'instructor' && data.Course.status === 'published'">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Enrolled:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <h5>{{ data.Course.enrollment.length }}</h5>
                    </v-col>
                  </v-row>
  
                  <!-- row9-->
                  <v-row class="ml-5 mt-0">
                    <v-col cols="4" class="mt-2">
                      <h5>Rating:</h5>
                    </v-col>
                    <v-col cols="1" class="mt-3 ml-1">
                      <h5>{{ data.Course.rating.netRating }}</h5>
                    </v-col>
                    <v-col cols="6" class="m-0 ml-0">
                      <div class="text-center">
                        <v-rating
                        color="yellow-darken-3"
                        v-model="data.Course.rating.netRating"
                        half-increments
                        ></v-rating>
                        <!-- <pre>{{ data.Course.rating.netRating  }}</pre> -->
                      </div>
                    </v-col>
                  </v-row>
  
                  <!-- row10-->
                  <v-row class="m-0" v-if="data.user === 'instructor' && data.Course.status === 'published'">
                    <v-col cols="4" class="m-0 pr-0 ml-5 mr-0">
                      <h5>Revenue:</h5>
                    </v-col>
                    <v-col cols="7" class="m-0 ml-0">
                      <v-icon class="mdi-currency-inr mdi mb-1">{{
                        mdiCurrencyInr
                      }}</v-icon>
                      <h5 style="display: inline">{{ data.Revenue }}</h5>
                    </v-col>
                  </v-row>
                  <!-- end of list -->
                </v-col>
              </v-row>
  
  
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      
  
  <script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "ViewCoursePage",
    components: {},

        props: {
            data : Object
        },
  
    computed: {
    },
  
    data() {
      return {
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
        }
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
  
  v-col{
    /* margin-top: -30px !important;  */
  }
  </style>
  