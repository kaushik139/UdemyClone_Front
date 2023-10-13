<template>
  <v-card class="mainCard">
    <v-tabs
      v-model="tab"
      bg-color="rgb(131, 0, 0)"
    >
      <v-tab value="section">Sections</v-tab>
      <v-tab value="video">Videos</v-tab>
      <v-tab value="exercise">Exercises</v-tab>
    </v-tabs>

    <v-card-text class="mainCard">
      <v-window v-model="tab">
        <v-window-item value="section">
          <section-page></section-page>
        </v-window-item>

        <v-window-item value="video">
          <video-page></video-page>
        </v-window-item>

        <v-window-item value="exercise">
          <exercises-page></exercises-page>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

  
  <script>
import ExercisesPage from './exercisesPage.vue'
import sectionPage from './sectionPage.vue'
import VideoPage from './videoPage.vue'
  
  export default {
  components: { sectionPage, VideoPage, ExercisesPage },
    name: 'CreatePage',
  
    data: () => ({
      tab: null
    })
  }
  </script>

  <style scoped>
  .mainCard{
    margin: 0px;
    padding: 0px;
  }
  </style>
  