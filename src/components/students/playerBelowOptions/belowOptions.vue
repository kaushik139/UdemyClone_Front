<template>
    <v-card class="mainCard">
      <v-tabs
        v-model="tab"
        style="color: purple; width: 65vw; justify-content: space-around; text-align: center;"
        grow
      >
        <v-tab value="Overview" @click="refresh">Overview</v-tab>
        <v-tab value="QnA" @click="refresh">QnA</v-tab>
        <v-tab value="Notes" @click="refresh">Notes</v-tab>
        <v-tab value="Ratings" @click="refresh">Ratings</v-tab>

      </v-tabs>
  
      <v-card-text class="mainCard">
        <v-window v-model="tab" >
          <v-window-item value="Overview" >
            <below-details class="m-5"></below-details>
        </v-window-item>
  
          <v-window-item value="QnA">
            <qn-a-view></qn-a-view>
          </v-window-item>
  
          <v-window-item value="Notes">
            <notes-v-iew></notes-v-iew>
          </v-window-item>

          <v-window-item value="Ratings">
            <ratings-view></ratings-view>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>
  
    
    <script>
import BelowDetails from './belowDetails.vue'
import NotesVIew from './notesVIew.vue'
import QnAView from './QnAView.vue'
import RatingsView from './ratingsView.vue'
    
    export default {
    components: {QnAView, NotesVIew, BelowDetails, RatingsView },
      name: 'belowOptions',
    
      data: () => ({
              tab: 'Overview',
              
      }),
  
      methods: {
          async refresh() {
            // await this.$store.dispatch("instructor/getDraftCourse", localStorage.getItem("courseDraft"));
        }
      }
    }
    </script>
  
    <style scoped>
    .mainCard{
      margin: 0px;
      padding: 0px;
    }
    </style>
    