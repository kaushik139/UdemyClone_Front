<template>
    <v-card>
      <v-tabs
        v-if="this.exerciseArray.length"
        v-model="tab"
        bg-color="red-lighten-3"
      >
        <v-tab
          v-for="(n, index) in exerciseArray"
          :key="n"
          :value="n"
          style="color: rgb(131, 0, 0)"
          @click="showExercise(index)"
        >
          Exercise {{ index + 1 }}
        </v-tab>
      </v-tabs>
  
      <div v-if="!this.exerciseArray.length" class="space">
        <h3>Begin with your first Exercise!</h3>
      </div>
  
      <!-- Create new Exercise -->
      <v-btn block class="btn" @click="addExercise"> Add New Exercise </v-btn>
  
      <!-- Edit Exercise -->
      <v-btn v-if="exerciseArray.length" block class="btn" @click="editExercise">
        Edit Exercise {{ selectedExerciseIndex }}
      </v-btn>
  
      <!-- Modal dialog -->
      <v-dialog v-model="showModal" max-width="400px">
        <v-card>
          <v-card-title> {{ modalTitle }} Exercise {{ modalExerciseNo }} </v-card-title>
  
          <!-- Form inside the modal -->
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="formData.exerciseName"
                label="Exercise Name"
                :rules="nameRules"
              ></v-text-field>
  
              <!-- Exercise Upload -->
              <div>
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
              </div>
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
      <v-card v-show="showExerciseDiv">
        <br />
        <h6>
          Exercise Name: <v-label> {{ selectedExercise.exerciseName }}</v-label>
        </h6>
        <br />
        <h6>
          Exercise Description
          <v-label>{{ selectedExercise.exerciseDescription }}</v-label>
        </h6>
      </v-card>
    </v-card>
  </template>
    
    <script>
  export default {
    computed: {
      selectedExercise() {
        return this.exerciseArray[0] || {};
      },
      isSelectedFile() {
        return this.selectedFile.length === 0 ? false : true;
      },
    },
  
    data: () => ({
      exerciseArray: [],
      selectedExerciseIndex: 1,
      showExerciseDiv: false,
      loading: false,
      timeout: null,
      exerciseName: "",
      tab: null,
      showModal: false,
      modalTitle: "",
      modalExerciseNo: "",
      formData: {
        exerciseName: "",
        exerciseDescription: "",
      },
      selectedFile: [],
  
      nameRules: [
        (value) => {
          if (value) return true;
          console.log("val" + value);
          return "Please enter a name!";
        },
      ],
    }),
  
    watch: {
      length(val) {
        this.tab = val - 1;
      },
    },
  
    methods: {
      addExercise() {
        this.modalTitle = "Adding";
        this.modalExerciseNo = this.exerciseArray.length + 1;
        this.showModal = true;
      },
      submitForm() {
        if (this.modalTitle === "Adding") {
          // Add New Exercise
          if (this.formData.exerciseName) {
            console.log("Form data submitted:", this.formData);
  
            this.exerciseArray.push({
              exerciseName: this.formData.exerciseName,
              exerciseDescription: this.formData.exerciseDescription,
            });
  
            this.formData.exerciseName = "";
            this.formData.exerciseDescription = "";
            this.showModal = false;
          } else alert("Please Enter a Exercise Name!");
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
      showExercise(val) {
        this.showExerciseDiv = true;
        this.selectedExercise = this.exerciseArray[val];
        console.log(this.selectedExercise.index);
        this.selectedExerciseIndex = val + 1;
      },
      editExercise() {
        this.modalTitle = "Editing";
        this.modalExerciseNo = this.selectedExerciseIndex;
        this.showModal = true;
        this.formData.exerciseName =
          this.selectedExercise.exerciseName || this.exerciseArray[0].exerciseName;
        this.formData.exerciseDescription =
          this.selectedExercise.exerciseDescription || this.exerciseArray[0].exerciseName;
      },
      uploadFile() {
        console.log(this.selectedFile[0].name);
      },
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