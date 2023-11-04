<template>
    <div class="contain">
        <h1>Player</h1>
        <v-row>
          <v-col cols="9" class="bg-success">
            <v-row>
              <video-player></video-player>
            </v-row>
            <v-row class="ml-1">
              Text here
            </v-row>
          </v-col>
          <v-col cols="3" class="bg-primary">right Menu
            <right-menu></right-menu>
          </v-col>



        </v-row>

    </div>
  </template>
  
  <script>
import RightMenu from '@/components/students/rightMenu.vue';
import VideoPlayer from '@/components/common/videoPlayer.vue';
  // import navBar from "./components/navBar.vue";
  
  export default {
    components: {
        RightMenu,
        VideoPlayer
      // navBar
    },
    name: "App",
  
    data: () => ({
     
    }),
    mounted() {
      this.$store.dispatch('player/')
    },
  };
  </script>
  
  <style scoped>
  </style>
  