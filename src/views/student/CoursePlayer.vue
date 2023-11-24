<template>
  <div class="contain">
    <nav-bar v-if="role !== 'admin'"></nav-bar>

  <div style="height: 100px; background-color: gray;" class="d-flex align-center mb-4">
    <h3 class="ml-4">Udemy@dmin</h3>
    <v-btn icon="mdi-home" class="ml-auto mr-4" @click="$router.push('/adminHome')"></v-btn>
</div>

    <!-- <h4>{{ toTitleCase(title) }}</h4> -->
    <v-row class="m-0">
      <v-col cols="8" class="">
        <v-card
          v-if="viewType === 'exercises'"
          class="ml-2 mr-2"
          style="height: 300px"
        >
          <v-row class="m-4">
            <h4>{{ exIndex + 1 }}. {{ this.exercise.title }}</h4>
          </v-row>
          <v-row class="ml-10">
            <p>{{ this.exercise.content }}</p>
          </v-row>
        </v-card>
        <v-card v-else>
          <video-player
            :path="currentVideoPath"
            :key="currentVideoPath"
          ></video-player>
        </v-card>
        <v-row v-if="role !=='admin'" class="m-2">
          <below-options :bData="bData" :key="bData"></below-options>
        </v-row>
      </v-col>
      <v-col cols="4" class="mt-3 p-0">
        <right-menu :data="rmData" @playerData="playerData"></right-menu>
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>
import RightMenu from "@/components/students/rightMenu.vue";
import VideoPlayer from "@/components/common/videoPlayer.vue";
import { mapGetters } from "vuex";
import navBar from "@/components/common/navBar.vue";
import BelowOptions from "@/components/students/playerBelowOptions/belowOptions.vue";

export default {
  components: {
    RightMenu,
    VideoPlayer,
    navBar,
    BelowOptions,
  },
  name: "App",

  computed: {
    ...mapGetters(["player/getCourse"]),
  },

  data: () => ({
    title: "",
    rmData: [],
    viewType: localStorage.getItem("viewType") || "videos",
    exercise: {},
    sectionIndex: localStorage.getItem("section") || 0,
    videoIndex: localStorage.getItem("viewIndex") || 0,
    exIndex: localStorage.getItem("viewIndex") || 0,
    role: localStorage.getItem('role'),
    currentVideoPath: "",
    minDesc: "",
    desc: "",
    rating: "",
    bData: {},
  }),

  methods: {
    /**
     *
     * @param {*} value
     */
    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    async playerData(value) {
      // console.log(value.viewIndex);
      this.viewType = value.viewType;
      this.sectionIndex = value.section;
      if (value.viewType === "videos") this.videoIndex = value.viewIndex;
      else this.exIndex = value.viewIndex;
      // console.log(this.videoIndex);
      localStorage.setItem("section", value.section);
      localStorage.setItem("viewIndex", value.viewIndex);
      localStorage.setItem("viewType", value.viewType);
      await this.mount();
    },

    async mount() {
      await this.$store.dispatch('player/coursePlayAction');
      // console.log(this['player/getCourse']);
      this.title = this["player/getCourse"].title;
      this.rmData = this["player/getCourse"].sections;
      if (this.viewType === "exercises") {
        this.exercise = {
          title: this.rmData[this.sectionIndex].exercises[this.exIndex].title,
          content:
            this.rmData[this.sectionIndex].exercises[this.exIndex].description,
        };
      }
      if (this.viewType === "videos") {
        this.currentVideoPath =
          this.rmData[this.sectionIndex].videos[this.videoIndex].path;
      }

      this.bData = {
        title: this['player/getCourse'].title,
        rating: this['player/getCourse'].rating,
        description: this["player/getCourse"].description,
        instructor: this["player/getCourse"].instructor,

      }

    },
  },

  async mounted() {
    await this.$store.dispatch("player/coursePlayAction");
    // this.minDesc = this['player/getCourse'].description.miniDescription;
    // this.desc = this['player/getCourse'].description.fullDescription;
    // console.log(this['player/getCourse'].description.fullDescription);
    await this.mount();
  },
};
</script>
  
  <style scoped>
</style>
  