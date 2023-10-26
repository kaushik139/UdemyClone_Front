<template>
 <v-card>
    <!-- for sections -->
  <v-tabs
      v-if="this.sectionArray.length"
      v-model="tabS"
      bg-color="red-lighten-3"
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tab
        v-for="(n, index) in sectionArray"
        :key="n"
        :value="n"
        style="color: rgb(131, 0, 0)"
        @click="
          showSection(index);
          showExercise(0);
        "
      >
        Section {{ index + 1 }}
      </v-tab>
    </v-tabs>

     <!-- for exercises -->
     <v-tabs
      v-if="this.exercisesArray.length"
      v-model="tabE"
      bg-color="red-lighten-3"
    >
      <v-tab
        v-for="(n, index) in exercisesArray"
        :key="n"
        :value="n"
        style="color: rgb(131, 0, 0)"
        @click="showExercise(index)"
      >
        Exercise {{ index + 1 }}
      </v-tab>
    </v-tabs>

    <div v-if="!this.sectionArray.length" class="space">
      <h3>Create a Section First!</h3>
    </div>

    <div
      v-if="this.sectionArray.length && !this.exercisesArray.length"
      class="space"
    >
      <h3>Begin with an Exercise!</h3>
    </div>

    <!-- Create new Exercise -->
    <v-btn block class="btn" @click="addExercise"> Add New Exercise </v-btn>

    <!-- Edit Exercise -->
    <v-btn v-if="exercisesArray.length" block class="btn" @click="editExercise">
      Edit Exercise {{ selectedExerciseIndex }}
    </v-btn>


     <!-- Modal dialog -->
     <v-dialog v-model="showModal" max-width="400px">
      <v-card>
        <v-card-title>
          {{ modalTitle }} Exercise {{ modalExerciseNo }}
        </v-card-title>

        <!-- Form inside the modal -->
        <v-card-text>
          <v-form @submit.prevent="submitForm">

            <v-text-field
              v-model="formData.exerciseName"
              label="Exercise Name"
              :rules="nameRules"
            ></v-text-field>

            <v-textarea
              v-model="formData.exerciseDescription"
              label="Exercise"
            ></v-textarea>

            <!-- Exercise File Upload -->
             <!-- <div>
              <v-file-input
                label="Add Exercise"
                v-model="selectedFile"
                accept="text/*"
              ></v-file-input>

              <v-btn class="btn" @click="uploadFile">Upload</v-btn>

              <div v-if="isSelectedFile" class="mt-2">
                <p>Selected File: {{ selectedFile[0].name }}</p>
              </div>
              <div v-if="!isSelectedFile" class="mt-2">
                <p>No File Selected</p>
              </div>
            </div>  -->
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="rgb(131, 0, 0)" @click="submitForm">Submit</v-btn>
          <v-btn color="rgb(200, 100, 100)" @click="clear">Clear</v-btn>
          <v-btn color="rgb(250, 100, 50)" @click="showModal = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

 <!-- Exercise Content -->
 <!-- <v-card v-show="exercisesArray.length">
      <br />
      <h6>
        Exercise Name:
        <v-label v-if="selectedExercise.exerciseName">
          {{ selectedExercise.exerciseName }}</v-label
        >
      </h6>
      <br />
      <h6>
        Exercise Description
        <v-label v-if="selectedExercise.exerciseDescription">{{
          selectedExercise.exerciseDescription
        }}</v-label>
      </h6>
    </v-card> -->


 </v-card>
</template>
    
    <script>
import { mapGetters } from "vuex";

export default {
  computed: {
    selectedExercise() {
      return this.exerciseArray[0] || {};
    },
    isSelectedFile() {
      return this.selectedFile.length === 0 ? false : true;
    },
    showExerciseDiv() {
      if (this.videoArray.length) {
        return true;
      } else return false;
    },
    ...mapGetters(["instructor/courseDraftGetter"]),
  },

  data: () => ({
    exercisesArray: [],
    sectionArray:[],
    selectedExerciseIndex: 0,
    selectedSectionIndex:0,
    showExerciseDiv: false,
    loading: false,
    timeout: null,
    exerciseName: "",
    tabE: null,
    tabS: null,
    showModal: false,
    modalTitle: "",
    modalExerciseNo: "",
    formData: {
      exerciseName: "",
      exerciseDescription: "",
    },
    selectedFile: [],
    selectedExercise: {},

    nameRules: [
      (value) => {
        if (value) return true;
        return "Please enter a name!";
      },
    ],
  }),

  // watch: {
  //   length(val) {
  //     this.tab = val - 1;
  //   },
  // },

  methods: {
    addExercise() {
      this.modalTitle = "Adding";
      // this.modalExerciseNo = this.exerciseArray.length + 1;
      this.showModal = true;
    },
    async submitForm() {
      console.log(this.selectedSectionIndex);
      if (this.modalTitle === "Adding") {

        // Add New Exercise
        if (this.formData.exerciseName && this.formData.exerciseDescription) {

          await this.$store.dispatch('instructor/AddExercise', {formData: this.formData, index: this.selectedSectionIndex});

          this.formData.exerciseName = "";
          this.formData.exerciseDescription = "";
          this.showModal = false;
        } else alert("Please Fill form Completely!");
      } else {
        // Edit existing Exercise
        if (this.formData.exerciseName) {
          console.log("Form data submitted:", this.formData);
          this.exerciseArray[this.selectedExerciseIndex - 1] = {
            exerciseName: this.formData.exerciseName,
            exerciseDescription: this.formData.exerciseDescription,
          };

          this.formData.exerciseName = "";
          this.formData.exerciseDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
      }
    },

    clear() {
      this.formData.exerciseName = "";
      this.formData.exerciseDescription = "";
    },
    
    editExercise() {
      this.modalTitle = "Editing";
      this.modalExerciseNo = this.selectedExerciseIndex;
      this.showModal = true;
      this.formData.exerciseName =
        this.selectedExercise.exerciseName ||
        this.exerciseArray[0].exerciseName;
      this.formData.exerciseDescription =
        this.selectedExercise.exerciseDescription ||
        this.exerciseArray[0].exerciseName;
    },
    uploadFile() {
      console.log(this.selectedFile[0].name);
    },

    showSection(val) {
      if (this.sectionArray[val]) {
        this.selectedSection = this.sectionArray[val];
        this.selectedSectionIndex = val;
        this.videoArray = this.sectionArray[val].videos;
        this.selectedVideoIndex = 0;
        this.tabS = val;
        this.tabE = 0;
      }
    },

    showExercise(val) {
      if (this.exercisesArray[val]) {
        this.selectedExercise.title =this.exercisesArray[val].title !== undefined? this.exercisesArray[val].title: "nil";
        this.selectedExercise.path =this.exercisesArray[val].path !== undefined? this.exercisesArray[val].path: "nil";

        this.selectedExerciseIndex = val;
      }
    },

    async mount(s, e) {
      console.log("s " + s);
      console.log("e " + e);

      try {
        await this.$store.dispatch("instructor/getDraftCourse",localStorage.getItem("courseDraft"));

          if (this["instructor/courseDraftGetter"].sectionsArray) {
          this.sectionArray =
            this["instructor/courseDraftGetter"].sectionsArray;

          if (this.sectionArray[this.selectedSectionIndex].exercises) {
            this.exercisesArray =
              this.sectionArray[this.selectedSectionIndex].exercises;
          }
          this.showSection(s);
          this.showExercise(e);

            }

        
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.mount(0, 0);
  },
};
</script>
    
    
    <style scoped>
.form1 {
  margin: 5%;
}

.btn {
  background-color: rgb(248, 123, 123);
}
.btn:hover {
  color: white;
  background-color: rgb(131, 0, 0);
}

.space {
  margin: 120px;
}
</style>