<template>
  <v-card>
    <!-- section Tabs -->
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
          showVideo(0);
        "
      >
        Section {{ index + 1 }}
      </v-tab>
    </v-tabs>

    <!-- Video tabs -->
    <v-tabs
      v-if="this.videoArray.length"
      v-model="tabV"
      bg-color="red-lighten-3"
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
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

    <!-- Edit/delete Video -->
    <v-row v-if="videoArray.length">
      <v-col cols="6" style="padding-right: 0px">
        <!-- Edit video -->
        <v-btn block class="btn" @click="editVideo">
          Edit video {{ selectedVideoIndex + 1 }}
        </v-btn>
      </v-col>
      <v-col cols="6" style="padding-left: 0px">
        <!-- Delete video -->
        <v-btn block class="btn" @click="deleteVideo">
          Delete video {{ selectedVideoIndex + 1 }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Modal dialog -->
    <v-dialog v-model="showModal" max-width="400px">
      <v-card>
        <v-card-title>
          {{ modalTitle }} Video {{ modalVideoNo + 1 }}
        </v-card-title>

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

              <v-btn
                v-show="modalTitle === 'Adding'"
                class="btn"
                @click="uploadFile"
                >Upload</v-btn
              >
              <v-btn
                v-show="modalTitle === 'Editing'"
                class="btn"
                @click="editFile"
                >Upload</v-btn
              >

              <div v-if="formData.videoFile" class="mt-2">
                <p>Selected File: {{ formData.videoFile[0].name }}</p>
              </div>
              <div v-if="!formData.videoFile" class="mt-2">
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
        Video Name:
        <v-label v-if="selectedVideo.title !== undefined">
          {{ selectedVideo.title }}</v-label
        >
      </h6>
      <br />
      <h6>
        Video link:
        <v-label v-if="selectedVideo.path !== undefined">
          {{ selectedVideo.path }}</v-label
        >
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
    showVideoDiv() {
      if (this.videoArray.length) {
        return true;
      } else return false;
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
    selectedVideo: {
      title: "",
      path: "",
    },
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
      this.modalVideoNo = this.videoArray.length;
      this.showModal = true;
    },

    async submitForm() {
      if (this.modalTitle === "Adding") {
        // Add New Video //
        if (this.formData.videoTitle) {
          try {
            await this.$store.dispatch("instructor/CreateVideo", {
              videoTitle: this.formData.videoTitle,
              sectionIndex: this.selectedSectionIndex,
            });

            await this.$store.dispatch(
              "instructor/getDraftCourse",
              localStorage.getItem("courseDraft")
            );
            await this.mount(this.selectedSectionIndex, this.videoArray.length);
            this.selectedVideoIndex = this.videoArray.length - 1;
            this.tabV = this.videoArray.length - 1;
            this.tabS = this.selectedSectionIndex;

            this.clear();
            this.showModal = false;
          } catch (err) {
            alert(err);
          }
        } else alert("Please fill the form Completely!");
      } else {
        // Edit existing Video
        if (this.formData.videoTitle) {
          try {
            await this.$store.dispatch("instructor/EditVideo", {
              title: this.formData.videoTitle,
              sectionIndex: this.selectedSectionIndex,
              videoIndex: this.selectedVideoIndex,
            });
            await this.mount(
              this.selectedSectionIndex,
              this.selectedVideoIndex
            );

            this.clear();
            this.showModal = false;
          } catch (err) {
            alert(err);
          }
        } else alert("Please Fill Form Completely!");
        await this.mount(this.selectedSectionIndex, this.selectedVideoIndex);
      }
      await this.$store.dispatch(
        "instructor/getDraftCourse",
        localStorage.getItem("courseDraft")
      );

      this.tabS = this.selectedSectionIndex;
    },

    async uploadFile() {
      if (this.formData.videoFile[0]) {
        await this.$store.dispatch("instructor/videoUpload", {
          sectionIndex: this.selectedSectionIndex,
          videoIndex: this.selectedVideoIndex,
          file: this.formData.videoFile[0],
        });
      }
    },

    editFile() {
      this.$store.dispatch("instructor/videoEdit", {
        sectionIndex: this.selectedSectionIndex,
        videoIndex: this.selectedVideoIndex,
        file: this.formData.videoFile[0],
      });
    },

    clear() {
      this.formData.videoTitle = "";
      this.formData.videoFile = "";
    },

    showSection(val) {
      if (this.sectionArray[val]) {
        this.selectedSection = this.sectionArray[val];
        this.selectedSectionIndex = val;
        this.videoArray = this.sectionArray[val].videos;
        this.selectedVideoIndex = 0;
        this.tabS = val;
        this.tabV = 0;
      }
    },

    showVideo(val) {
      if (this.videoArray[val]) {
        this.selectedVideo.title =
          this.videoArray[val].title !== undefined
            ? this.videoArray[val].title
            : "nil";
        this.selectedVideo.path =
          this.videoArray[val].path !== undefined
            ? this.videoArray[val].path
            : "nil";

        this.selectedVideoIndex = val;
      }
    },

    editVideo() {
      this.modalTitle = "Editing";
      this.modalVideoNo = this.selectedVideoIndex;
      this.showModal = true;
      this.formData.videoTitle = this.selectedVideo.title;
    },

    async deleteVideo() {
      await this.$store.dispatch("instructor/deleteVideo", {
        sectionIndex: this.selectedSectionIndex,
        videoIndex: this.selectedVideoIndex,
      });
      if (this.videoArray.length) {
        await this.mount(this.selectedSectionIndex, 0);
      }
    },

    async mount(u, v) {
      // console.log("u " + u);
      // console.log("v " + v);
      try {
        await this.$store.dispatch("instructor/getDraftCourse",localStorage.getItem("courseDraft"));

        if (this["instructor/courseDraftGetter"].sectionsArray) {
          this.sectionArray =
            this["instructor/courseDraftGetter"].sectionsArray;

          if (this.sectionArray[this.selectedSectionIndex].videos) {
            this.videoArray =
              this.sectionArray[this.selectedSectionIndex].videos;
          }
          this.showSection(u);
          this.showVideo(v);
        }
      } catch (err) {
        console.error(err);
      }
    },
  },

  async mounted() {
    await this.mount(0, 0);
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

::v-deep .v-icon.mdi-arrow-right-bold-box-outline,
::v-deep .v-icon.mdi-arrow-left-bold-box-outline {
  color: rgb(131, 0, 0);
}
</style>