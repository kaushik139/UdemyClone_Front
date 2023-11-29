<template>
  <v-card class="mainCard">
    <v-tabs
      v-model="tab"
      style="
        color: purple;
        width: 60vw;
        justify-content: space-around;
        text-align: center;
      "
      grow
    >
      <v-tab value="Overview" @click="refresh">Overview</v-tab>
      <v-tab value="QnA" @click="refresh">QnA</v-tab>
      <v-tab value="Notes" @click="refresh">Notes</v-tab>
      <v-tab value="Ratings" @click="refresh">Ratings</v-tab>
    </v-tabs>

    <v-card-text class="mainCard">
      <v-window v-model="tab">
        <v-window-item value="Overview">
          <below-details class="m-5" :b-Data="bData" :key="bData"></below-details>
        </v-window-item>

        <v-window-item value="QnA">
          <qn-a-view :b-Data="bData" :key="bData"></qn-a-view>
        </v-window-item>

        <v-window-item value="Notes">
          <notes-view :b-Data="bData" :key="bData"></notes-view>
        </v-window-item>

        <v-window-item value="Ratings">
          <ratings-view :b-Data="bData" :key="bData"></ratings-view>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
  
    
    <script>
import BelowDetails from "./belowDetails.vue";
// import NotesView from "./notesView.vue";
import QnAView from "./QnAView.vue";
import RatingsView from "./ratingsView.vue";

export default {
  components: { QnAView, NotesView, BelowDetails, RatingsView },

        name: "belowOptions",

        props: {
            bData: Object,
        },

  data: () => ({
    tab: "Overview",
  }),

  methods: {
    async refresh() {
      // await this.$store.dispatch("instructor/getDraftCourse", localStorage.getItem("courseDraft"));
    },
        },

};
</script>
  
    <style scoped>
.mainCard {
  margin: 0px;
  padding: 0px;
}
</style>
    