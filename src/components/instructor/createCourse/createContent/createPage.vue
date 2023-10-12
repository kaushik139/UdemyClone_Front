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
          Two
        </v-window-item>

        <v-window-item value="exercise">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

  
  <script>
import sectionPage from './sectionPage.vue'
  
  export default {
  components: { sectionPage },
    name: 'Create Page',
  
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
  