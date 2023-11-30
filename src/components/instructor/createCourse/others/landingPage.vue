<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h5>Create a Landing Page</h5>

        <!-- BackGround Image -->
        <div class="mb-6">
          <v-file-input
            name="Image-File"
            label="Add a Background Image"
            v-model="selectedFile"
            accept="image/*"
          ></v-file-input>

          <v-btn name="Upload-Btn" class="btn" @click="upload">Upload</v-btn>

          <!-- preview image -->
          <div
            style="
              width: 25vh;
              height: 100px;
              margin-left: auto;
              margin-right: 10%;
            "
          >
            <v-img name="Image-Preview" :src="imgURL" alt="Preview Image" />
          </div>

          <div v-if="isSelectedFile" class="mt-2">
            <p name="Image-File-Name">Selected File: {{ selectedFile[0].name }}</p>
          </div>
          <div v-if="!isSelectedFile" class="mt-2">
            <p>No File Selected</p>
          </div>
        </div>

        <!-- Full Description -->
        <v-textarea name="Full-Description" label="Enter Full Description" v-model="fullDesc">
        </v-textarea>

        <!-- Intended Audience -->
        <!-- <v-select :items="items" label="Intended Audience" v-model="planData.category"></v-select> -->

        <v-btn name="Submit-Btn" class="btn" @click="submit">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "LandingPage",

  computed: {
    isSelectedFile() {
      return this.selectedFile.length === 0 ? false : true;
    },
    ...mapGetters(["instructor/courseDraftGetter"]),
  },

  data: () => ({
    selectedFile: [],
    fullDesc: "",
    previewImage: false,
    imgURL: "",
  }),

  methods: {
    upload() {
      if (this.selectedFile.length !== 0) {
        // console.log(this.selectedFile[0]);
        this.$store.dispatch("instructor/bgImageUpload", this.selectedFile[0]);
      } else alert("No Image Selected!");
         this.getPreview();
    },

    submit() {
      if (this.fullDesc) {
        this.$store.dispatch("instructor/landingPageAction", this.fullDesc);
      } else alert("Please fill form Completely!");
    },

    getPreview() {
      setTimeout(() => {
         const res = `http://localhost:3000/Images/${this.$store.getters['instructor/courseDraftGetter'].image.bgImage}`;
        // console.log(this.$store.getters['instructor/courseDraftGetter'].image.bgImage);
        this.imgURL = res;
      },100)
    },
  },

  mounted() {
    if (this["instructor/courseDraftGetter"]) {
      this.fullDesc = this["instructor/courseDraftGetter"].fullDescription;
      this.getPreview();
    }
  },
};
</script>

  <style scoped>
h5 {
  color: rgb(131, 0, 0);
}
.btn {
  background-color: rgb(248, 123, 123);
}
.btn:hover {
  color: white;
  background-color: rgb(131, 0, 0);
}
</style>
  