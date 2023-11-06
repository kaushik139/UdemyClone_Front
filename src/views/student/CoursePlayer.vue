<template>
    <div class="contain">
      <nav-bar></nav-bar>

        <!-- <h4>{{ toTitleCase(title) }}</h4> -->
        <v-row class="m-0">
          <v-col cols="8" class="">
            <v-card v-if="viewType === 'exercise'" class="ml-2 mr-2" style="height: 300px;">
              <v-row class="m-4">
                <h4>{{ exIndex + 1 }}. {{ this.exercise.title }}</h4>
               </v-row>
               <v-row class="ml-10">
                <p>{{ this.exercise.content }}</p>
               </v-row>
            </v-card>
            <v-card v-else>
              <video-player :path="currentVideoPath" :key="currentVideoPath"></video-player>
            </v-card>
            <v-row class="m-2">
              <below-options></below-options>

              <!-- <h6>
              {{ minDesc }}
            </h6>
            {{ desc }} -->
          </v-row>
          </v-col>
          <v-col cols="4" class="mt-3 p-0">
            <right-menu :data="rmData" @playerData="playerData" ></right-menu>
          </v-col>
        </v-row>  
    </div>
  </template>
  
  <script>
import RightMenu from '@/components/students/rightMenu.vue';
import VideoPlayer from '@/components/common/videoPlayer.vue';
import { mapGetters } from 'vuex';
  import navBar from "@/components/common/navBar.vue";
import BelowOptions from '@/components/students/playerBelowOptions/belowOptions.vue';
  
  export default {
    components: {
        RightMenu,
        VideoPlayer,
        navBar,
        BelowOptions
    },
    name: "App",

    computed: {
      ...mapGetters(["player/getCourse"]),

    },
  
    data: () => ({
        title: '',
        rmData: [],
        viewType: localStorage.getItem('viewType') || 'video',
        exercise: {},
        sectionIndex: localStorage.getItem('section') || 0,
        videoIndex: localStorage.getItem('viewIndex') || 0,
        exIndex: localStorage.getItem('viewIndex') || 0,
        currentVideoPath: '',
        minDesc: '',
        desc: '',
        rating: '',

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
          console.log(value.viewIndex);
          this.viewType = value.viewType
          this.sectionIndex = value.section;
            if (value.viewType === 'video') this.videoIndex = value.viewIndex;
            else this.exIndex = value.viewIndex;
            console.log(this.videoIndex);



          localStorage.setItem('section', value.section)
          localStorage.setItem('viewIndex', value.viewIndex)
          localStorage.setItem('viewType', value.viewType)
          await this.mount();
        },

        async mount() {
        this.title = this["player/getCourse"].title;
        this.rmData = this["player/getCourse"].sections;
            if (this.viewType === 'exercise') {
              this.exercise = {
          title: this.rmData[this.sectionIndex].exercises[this.exIndex].title,
          content: this.rmData[this.sectionIndex].exercises[this.exIndex].description
        }
        }
            if (this.viewType === 'video')
            this.currentVideoPath = this.rmData[this.sectionIndex].videos[this.videoIndex].path;
       }
        
    },

    async mounted() {
      await this.$store.dispatch('player/coursePlayAction')
      // this.minDesc = this['player/getCourse'].description.miniDescription;
      // this.desc = this['player/getCourse'].description.fullDescription;
      // console.log(this['player/getCourse'].description.fullDescription);
        await this.mount();
    },
  };
  </script>
  
  <style scoped>
  </style>
  