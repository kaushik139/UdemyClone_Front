<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h5>Create a Landing Page</h5>

        <!-- BackGround Image -->
        <div>
          <v-file-input
            label="Add a Background Image"
            v-model="selectedFile"
            accept="image/*"
          ></v-file-input>

          <v-btn class="btn" @click="uploadFile">Upload</v-btn>

          <div v-if="isSelectedFile" class="mt-2">
            <p>Selected File: {{ selectedFile[0].name }}</p>
          </div>
          <div v-if="!isSelectedFile" class="mt-2">
            <p>No File Selected</p>
          </div>
        </div>

        <!-- Full Description -->
        <v-textarea label="Enter Full Description" v-model="fullDesc">
        </v-textarea>

        <!-- Intended Audience -->
        <!-- <v-select :items="items" label="Intended Audience" v-model="planData.category"></v-select> -->

        <v-btn class="btn" @click="submit">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
export default {
  name: "LandingPage",

  computed: {
    isSelectedFile() {
      return this.selectedFile.length === 0 ? false : true;
    },
  },

  data: () => ({
    selectedFile: [],
    fullDesc: "",
  }),

  methods: {
    uploadFile() {
      console.log(this.selectedFile[0].name);
    },
    submit() {
      if (this.selectedFile.length !== 0 && this.fullDesc) {
        const landingPageData = {
          // backGroundImage: this.selectedFile[0].name,
          fullDescription: this.fullDesc,
        };

        this.$store.dispatch('instructor/landingPageAction', {value: landingPageData})

        // console.log(landingPageData);
      } else alert("Please fill form Completely!");
    },
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
  