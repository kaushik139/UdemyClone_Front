<template>
  <v-container class="mt-12">
    <v-row class="text-center">
      <!-- image -->
      <v-col cols="4">
        <img
          :src="Course.imgURL"
          alt="Course Image"
          style="max-height: 100%; width: 100%"
        />
      </v-col>
      <!-- Contents -->
      <v-col cols="8" class="mt-4">
        <!-- title -->
        <v-row class="m-0 p-0">
          <v-col cols="4" class="head">
            <h6>Title:</h6>
          </v-col>
          <v-col cols="8" class="text"
            ><h6>{{ toTitleCase(Course.title) }}</h6></v-col
          >
        </v-row>
        <!-- description -->
        <v-row class="m-0 p-0">
          <v-col cols="4" class="head">
            <h6>Description:</h6>
          </v-col>
          <v-col cols="8" class="text"
            ><h6>{{ Course.miniDescription }}</h6></v-col
          >
        </v-row>
        <!-- Sections -->
        <v-row class="m-0 p-0">
          <v-col cols="4" class="head">
            <h6>Total Sections:</h6>
          </v-col>
          <v-col cols="8" class="text"
            ><h6>{{ Course.sections }}</h6></v-col
          >
        </v-row>
        <!-- Videos -->
        <v-row class="m-0 p-0">
          <v-col cols="4" class="head">
            <h6>Total Videos:</h6>
          </v-col>
          <v-col cols="8" class="text"
            ><h6>{{ Course.videos }}</h6></v-col
          >
        </v-row >
        <!-- Exercises -->
        <v-row class="m-0 p-0">
          <v-col cols="5" class="head">
            <h6>Total Exercises:</h6>
          </v-col>
          <v-col cols="6" class="text"
            ><h6>{{ Course.exercises }}</h6></v-col
          >
        </v-row>
        <!-- Price -->
        <v-row class="m-0 p-0">
          <v-col cols="4" class="head">
            <h6>Total Price:</h6>
          </v-col>
          <v-col cols="8"
            ><v-icon class="mdi-currency-inr mdi">{{ mdiCurrencyInr }}</v-icon>
            <h6 class="text" style="display: inline">
              {{ Course.price }}
            </h6></v-col
          >
        </v-row>
        <!-- end -->
      </v-col>
    </v-row>
    <!-- dialog Button -->
    <v-btn class="btn btn-danger mt-12">
      Request to Publish

      <v-dialog v-model="dialog" activator="parent" width="auto" height="20%">
        <v-card>
          <v-card-text>
            Your Course Will be Reviewed and Published in about 48 Hours
          </v-card-text>
          <v-card-actions>
            <v-btn color="rgb(131, 0, 0)" @click="publish"
              >Request Publish</v-btn
            >
            <v-btn color="rgb(250, 100, 50)" @click="dialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-container>
</template>
  
  <script>
import { mapGetters } from "vuex";

export default {
  name: "PublishPage",

  computed: {
    ...mapGetters(["instructor/courseDraftGetter"]),
  },

  data: () => ({
    Course: {
      title: "",
      miniDescription: "",
      price: 0,
      imgURL: "",
      sections: 0,
      videos: 0,
      exercises: 0,
    },
    showModal: false,
    courseToPublishIndex: null,
    dialog: false,
  }),
  methods: {
    sub() {
      console.log("qq");
      this.showModal = false;
      alert(`Course: ${this.Courses[this.courseToPublishIndex]} is Published!`);
    },

    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    publish() {
      this.$store.dispatch(
        "instructor/Publish",
        this["instructor/courseDraftGetter"].id
      );
      // alert('requested')
      this.dialog = false;
    },

    async mount() {
      await this.$store.dispatch(
        "instructor/getDraftCourse",
        localStorage.getItem("courseDraft")
      );
      let numOVideos = 0;
      let numOExercises = 0;
      for (
        let i = 0;
        i < this["instructor/courseDraftGetter"].sectionsArray.length;
        i++
      ) {
        numOVideos +=
          this["instructor/courseDraftGetter"].sectionsArray[i].videos.length;
        numOExercises +=
          this["instructor/courseDraftGetter"].sectionsArray[i].exercises
            .length;
      }

      this.Course = {
        title: this["instructor/courseDraftGetter"].title,
        miniDescription: this["instructor/courseDraftGetter"].miniDescription,
        price: this["instructor/courseDraftGetter"].pricing.finalPrice,
        imgURL: `http://localhost:3000/Images/${this.$store.getters["instructor/courseDraftGetter"].image.bgImage}`,
        sections: this["instructor/courseDraftGetter"].sectionsArray.length,
        videos: numOVideos,
        exercises: numOExercises,
      };
    },
  },

  mounted() {
    this.mount();
  },
};
</script>

<style scoped>
.head {
  color: rgb(131, 0, 0);
}
.text {
  color: rgb(124, 73, 73);
}
</style>
  