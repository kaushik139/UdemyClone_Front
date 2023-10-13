<template>
  <v-card>
    <v-tabs
      v-if="this.videoArray.length"
      v-model="tab"
      bg-color="red-lighten-3"
    >
      <v-tab
        v-for="(n, index) in videoArray"
        :key="n"
        :value="n"
        style="color: rgb(131, 0, 0)"
        @click="showVideo(index)"
      >
        Video {{ index + 1 }}
      </v-tab>
    </v-tabs>

    <div v-if="!this.videoArray.length" class="space">
      <h3>Begin with your first Video!</h3>
    </div>

    <!-- Create new Video -->
    <v-btn block class="btn" @click="addVideo"> Add New Video </v-btn>

    <!-- Edit video -->
    <v-btn v-if="videoArray.length" block class="btn" @click="editVideo">
      Edit video {{ selectedVideoIndex }}
    </v-btn>

    <!-- Modal dialog -->
    <v-dialog v-model="showModal" max-width="400px">
      <v-card>
        <v-card-title> {{ modalTitle }} Video {{ modalVideoNo }} </v-card-title>

        <!-- Form inside the modal -->
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.videoName"
              label="Video Name"
              :rules="nameRules"
            ></v-text-field>

            <!-- Video Upload -->
            <div>
              <v-file-input
                label="Add Video"
                v-model="selectedFile"
                accept="video/*"
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

    <!-- Video Content -->
    <v-card v-show="showVideoDiv">
      <br />
      <h6>
        Video Name: <v-label> {{ selectedVideo.videoName }}</v-label>
      </h6>
      <br />
      <h6>
        Video Description
        <v-label>{{ selectedVideo.videoDescription }}</v-label>
      </h6>
    </v-card>
  </v-card>
</template>
  
  <script>
export default {
  computed: {
    selectedVideo() {
      return this.videoArray[0] || {};
    },
    isSelectedFile() {
      return this.selectedFile.length === 0 ? false : true;
    },
  },

  data: () => ({
    videoArray: [],
    selectedVideoIndex: 1,
    showVideoDiv: false,
    loading: false,
    timeout: null,
    videoName: "",
    tab: null,
    showModal: false,
    modalTitle: "",
    modalVideoNo: "",
    formData: {
      videoName: "",
      videoDescription: "",
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
    addVideo() {
      this.modalTitle = "Adding";
      this.modalVideoNo = this.videoArray.length + 1;
      this.showModal = true;
    },
    submitForm() {
      if (this.modalTitle === "Adding") {
        // Add New Video
        if (this.formData.videoName) {
          console.log("Form data submitted:", this.formData);

          this.videoArray.push({
            videoName: this.formData.videoName,
            videoDescription: this.formData.videoDescription,
          });

          this.formData.videoName = "";
          this.formData.videoDescription = "";
          this.showModal = false;
        } else alert("Please Enter a Video Name!");
      } else {
        // Edit existing Video
        if (this.formData.videoName) {
          console.log("Form data submitted:", this.formData);
          this.videoArray[this.selectedVideoIndex - 1] = {
            videoName: this.formData.videoName,
            videoDescription: this.formData.videoDescription,
          };

          this.formData.videoName = "";
          this.formData.videoDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
      }
    },
    clear() {
      this.formData.videoName = "";
      this.formData.videoDescription = "";
    },
    showVideo(val) {
      this.showVideoDiv = true;
      this.selectedVideo = this.videoArray[val];
      console.log(this.selectedVideo.index);
      this.selectedVideoIndex = val + 1;
    },
    editVideo() {
      this.modalTitle = "Editing";
      this.modalVideoNo = this.selectedVideoIndex;
      this.showModal = true;
      this.formData.videoName =
        this.selectedVideo.videoName || this.videoArray[0].videoName;
      this.formData.videoDescription =
        this.selectedVideo.videoDescription || this.videoArray[0].videoName;
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