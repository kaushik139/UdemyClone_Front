  <template class="m-0 p-0">
    <v-card class="mx-auto">
      <v-list>
        <v-list-group v-for="(section, index) in data" :key="index">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-content class="d-flex">
                <v-icon icon="mdi-text-box-multiple" color="purple"></v-icon>
                <v-list-item-title name="section-title-to-be-displayed" class="ml-4">{{ section.sectionTitle }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <!-- Videos -->
          <v-list-item
            v-for="(video, videoIndex) in section.videos"
            :key="videoIndex"
            @click="selectVideo(index, videoIndex)"
            :class="{
              active: selectedSection === index && selectedVideo === videoIndex,
            }"
            class="d-flex"
          >
            <v-list-item-content style="display: flex">
              <!-- <v-checkbox
                style="height: 40px; display: flex; margin-top: -14px"
                color="purple"
                
                @click="check(video._id)"
                ></v-checkbox> -->
              <v-icon icon="mdi-play" color="purple-darken-1"></v-icon>
              <v-list-item-title name="video-title" class="video-title ml-4">{{ video.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Exercises -->
          <v-list-item
            v-for="(ex, exIndex) in section.exercises"
            :key="exIndex"
            @click="selectExercise(index, exIndex)"
            :class="{
              active: selectedSection === index && selectedExercise === exIndex,
            }"
            class="d-flex"
          >
            <v-list-item-content style="display: flex">
              <!-- <v-checkbox
                style="
                  height: 40px;
                  display: flex;
                  margin-top: -14px;
                "
                color="purple"
                @click="check(ex._id)"

              ></v-checkbox> -->
              <v-icon icon="mdi-note-edit" color="purple-darken-1"></v-icon>
              <v-list-item-title class="ml-4">{{ ex.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </template>
  <script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      dd: {
        get() {
          console.log();
        }
      }
    },

    props: {
      data: Array,
    },
    emits: {
      playerData: Object,
    },

    data: () => ({
      selectedSection: localStorage.getItem("section") || 0,
      selectedVideo: localStorage.getItem("viewIndex") || null,
      selectedExercise: localStorage.getItem("viewIndex") || null,
      viewType: localStorage.getItem("viewIndex") || "videos",
      a:true
    }),

    methods: {
      selectVideo(index, videoIndex) {
        this.selectedSection = index;
        this.selectedVideo = videoIndex;
        this.selectedExercise = null;
        this.$emit("playerData", {
          section: index,
          viewIndex: videoIndex,
          viewType: "videos",
        });
      },
      selectExercise(index, exIndex) {
        this.selectedSection = index;
        this.selectedExercise = exIndex;
        this.selectedVideo = null;
        this.$emit("playerData", {
          section: index,
          viewIndex: exIndex,
          viewType: "exercises",
        });
      },
    },
  };
  </script>
    
  <style scoped>
  .active {
    background-color: #ccc; 
  }

  .video-title {
    /* flex: 1; */
    /* white-space: nowrap; */
    /* overflow: hidden; */
    text-overflow: ellipsis;
  }
  </style>