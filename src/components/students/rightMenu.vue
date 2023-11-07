<template class="m-0 p-0">
  <v-card
    class="mx-auto">
    <v-list>

        <v-list-group  v-for="(section, index) in data" :key="index">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-text-box-multiple"
              :title="section.sectionTitle">
          </v-list-item>
          </template>
          <!-- Videos -->
          <v-list-item
            v-for="(video, videoIndex) in section.videos"
            :key="videoIndex"
            :title="video.title"
            @click="selectVideo( index, videoIndex )"
            :class="{ 'active': selectedSection === index && selectedVideo === videoIndex }"
            prepend-icon="mdi-play"
          ></v-list-item>
          <!-- Exercises -->
          <v-list-item 
            v-for="(ex, exIndex) in section.exercises"
            :key="exIndex"
            :title="ex.title"
            @click="selectExercise( index, exIndex )"
            :class="{ 'active': selectedSection === index && selectedExercise === exIndex }"
            prepend-icon="mdi-note-edit"
          ></v-list-item>
        </v-list-group>

    </v-list>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {

  computed: {},

  props: {
    data: Array,
  },
  emits: {
    playerData: Object,
  },

    data: () => ({
      selectedSection: localStorage.getItem('section') || 0,
      selectedVideo: localStorage.getItem('viewIndex') || null,
      selectedExercise: localStorage.getItem('viewIndex') || null,
      viewType: localStorage.getItem('viewIndex') || 'videos',
      
  }),

  methods: {
    selectVideo(index, videoIndex) {
      this.selectedSection = index;
      this.selectedVideo = videoIndex; 
      this.selectedExercise = null;
      // console.log(this.selectedSection);
      // console.log(index);
      this.$emit('playerData', {section: index, viewIndex: videoIndex, viewType: 'videos'})
    },
    selectExercise(index, exIndex) {
      this.selectedSection = index;
      this.selectedExercise = exIndex; 
      this.selectedVideo = null;
      this.$emit('playerData', {section: index, viewIndex: exIndex, viewType: 'exercises'})
    },
  },

  async mounted() {
    // console.log(this.data);
    // console.log(this.selectedSection);

  }
  }
</script>
  
<style scoped>
.active {
  background-color: #ccc; /* Change this to your desired highlight color */
}
</style>