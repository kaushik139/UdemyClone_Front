<template>
  <v-card>
    <!-- section Tabs -->
    <v-tabs
      v-if="this.sectionArray.length"
      v-model="tabS"
      bg-color="red-lighten-3"
    >
      <v-tab
        v-for="(n, index) in sectionArray"
        :key="n"
        :value="n"
        style="color: rgb(131, 0, 0)"
        @click="showSection(index)"
      >
        Section {{ index + 1 }}
      </v-tab>
    </v-tabs>

    <!-- Video tabs -->
    <v-tabs
      v-if="this.videoArray.length"
      v-model="tabV"
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

    <div v-if="!this.sectionArray.length" class="space">
      <h3>Create a Section First!</h3>
    </div>

    <div
      v-if="this.sectionArray.length && !this.videoArray.length"
      class="space"
    >
      <h3>Begin with a Video Lecture!</h3>
    </div>

    <!-- Create new Video -->
    <v-btn v-if="this.sectionArray.length" block class="btn" @click="addVideo">
      Add New Video
    </v-btn>

    <!-- Edit/delete Section -->
    <v-row v-if="videoArray.length">
    <v-col cols="6" style="padding-right: 0px;">
       <!-- Edit video -->
    <v-btn block class="btn" @click="editVideo">
      Edit video {{ selectedVideoIndex + 1 }}
    </v-btn>
    </v-col>
    <v-col cols="6" style="padding-left: 0px;">
       <!-- Delete video -->
    <v-btn block class="btn" @click="deleteVideo">
      Delete video {{ selectedVideoIndex + 1 }}
    </v-btn>
    </v-col>
    </v-row>

   

    <!-- Modal dialog -->
    <v-dialog v-model="showModal" max-width="400px">
      <v-card>
        <v-card-title> {{ modalTitle }} Video {{ modalVideoNo + 1 }} </v-card-title>

        <!-- Form inside the modal -->
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.videoTitle"
              label="Video Name"
              :rules="nameRules"
            ></v-text-field>

            <!-- Video Upload -->
            <div>
              <v-file-input
                label="Add Video"
                v-model="formData.videoFile"
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
    <v-card v-show="videoArray.length">
      <br />
      <h6>
        Video Name: <v-label> {{ selectedVideo.title }}</v-label>
      </h6>
      <br />
      <h6>
       Video
      </h6>
    </v-card>
  </v-card>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  computed: {
    isSelectedFile() {
      return this.selectedFile.length === 0 ? false : true;
    },

    ...mapGetters(["instructor/courseDraftGetter"]),
  },

  data: () => ({
    sectionArray: [],
    videoArray: [],
    selectedVideoIndex: 0,
    showVideoDiv: false,
    loading: false,
    timeout: null,
    videoTitle: "",
    tabS: null,
    tabV: null,
    showModal: false,
    modalTitle: "",
    modalVideoNo: "",
    formData: {
      videoTitle: "",
      videoFile: "",
    },
    selectedFile: [],
    selectedVideo:{},
    nameRules: [
      (value) => {
        if (value) return true;
        return "Please enter a name!";
      },
    ],

    selectedSection: {},
    selectedSectionIndex: 0,
  }),

  watch: {
    length(val) {
      this.tab = val - 1;
    },
  },

  methods: {
    addVideo() {
      this.modalTitle = "Adding";
      // this.modalVideoNo = this.videoArray.length + 1;
      this.showModal = true;
    },

    async submitForm() {
      if (this.modalTitle === "Adding") {
        // Add New Video
        if (this.formData.videoTitle) {
          // && this.formData.videoFile
          console.log("Form data submitted:", this.selectedSectionIndex);
          this.$store.dispatch("instructor/CreateVideo", {
            videoTitle: this.formData.videoTitle,
            sectionIndex: this.selectedSectionIndex,
          });

          // this.videoArray.push({
          //   videoTitle: this.formData.videoTitle,
          //   videoDescription: this.formData.videoDescription,
          // });

          this.formData.videoTitle = "";
          this.formData.videoDescription = "";
          this.showModal = false;
        } else alert("Please fill the form Completely!");
      } else {
        // Edit existing Video
        if (this.formData.videoTitle) {
          // console.log("Form data submitted:", this.formData);
          // this.videoArray[this.selectedVideoIndex - 1] = {
          //   videoTitle: this.formData.videoTitle,
          //   videoDescription: this.formData.videoDescription,
          // };
            this.$store.dispatch('instructor/EditVideo', {title: this.formData.videoTitle, sectionIndex: this.selectedSectionIndex, videoIndex: this.selectedVideoIndex})


          this.formData.videoTitle = "";
          this.formData.videoDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
      }
     await this.mount(this.selectedSectionIndex, this.selectedVideoIndex)
    },

    uploadFile() {
      console.log(this.formData.videoFile[0]);
    },

    clear() {
      this.formData.videoTitle = "";
      this.formData.videoFile = "";
    },

    showSection(val) {
      // this.showSectionDiv = true;
      console.log(val);
      this.selectedSection = this.sectionArray[val];
      console.log(this.selectedSection);
      this.selectedSectionIndex = val + 1;
      this.videoArray = this.sectionArray[val].videos;
      this.selectedVideoIndex = 0;
      this.tabV = 0;  
      // this.showVideo(0);
      // this.selectedSectionVideos = this.selectedSection.videos.length;
      // console.log(this.selectedSection.videos.length);
    },

    showVideo(val) {
      this.showVideoDiv = true;
      this.selectedVideo = this.videoArray[val];
      this.selectedVideoIndex = val;
      // console.log(this.selectedVideoIndex);
    },

    editVideo() {
      this.modalTitle = "Editing";
      this.modalVideoNo = this.selectedVideoIndex;
      this.showModal = true;
      // console.log(this.selectedVideo.title);
      this.formData.videoTitle =
        this.selectedVideo.title;
    },

    async mount(u, v) {
      await this.$store.dispatch(
        "instructor/getDraftCourse",
        localStorage.getItem("courseDraft")
      );
      if (this["instructor/courseDraftGetter"].sectionsArray) {
        console.log(this["instructor/courseDraftGetter"].sectionsArray);
        // console.log(this['instructor/courseDraftGetter'].sectionsArray[0]);
        // console.log(this['instructor/courseDraftGetter'].sectionsArray[0].sectionTitle);
        this.sectionArray = this["instructor/courseDraftGetter"].sectionsArray;
        if (this.sectionArray[this.selectedSectionIndex].videos) {
          // console.log(this.sectionArray[this.selectedSectionIndex].videos);
          this.videoArray = this.sectionArray[this.selectedSectionIndex].videos;
        }
        // if (this.sectionArray.length) this.showSection(v);
        // else {
        //   this.selectedSection = {};
        //   this.selectedSectionIndex = 1;
        //   this.showSectionDiv = false;
        // }
        // console.log(this.sectionArray);
          this.selectedVideo = this.videoArray[v]
          this.showSection(u);
          this.showVideo(v)
      }
    },
  },

  async mounted() {
    await this.mount(0,0);
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