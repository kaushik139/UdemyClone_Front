<template>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h5>Your Courses:</h5>
          <ul type="none" v-for="(item, index) in Courses" :key="index">
            <li @click="publish(index)">
              <img src="#" alt="Course Image" style="min-width: 100px; min-height: 100px; border: 2px solid black;">
              {{ index+1 }}. {{ item }}
            </li>
          </ul>

          <!-- Modal dialog -->
      <v-dialog v-model="showModal" max-width="400px">
        <v-card>
          <v-card-title> Publish Course: {{ courseToPublishIndex+1 }}. {{ Courses[courseToPublishIndex] }} </v-card-title>
  
          <!-- Form inside the modal -->
          <v-card-text>
            <v-form @submit.prevent="submitForm">
             
              <div>
  
                <v-btn class="btn btn-secondary" @click="sub">Upload</v-btn>
  
              </div>
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-btn color="rgb(250, 100, 50)" @click="showModal = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  
  export default {
    name: 'PublishPage',
  
    data: () => ({
        Courses: [
          'Course A',
          'Course B'
        ],
        showModal: false,
        courseToPublishIndex: null, 

    }),
    methods: {
        publish(index) {
        this.showModal = true;
          this.courseToPublishIndex = index;
      },
      sub() { 
        console.log('qq');
        alert(`Course: ${this.Courses[this.courseToPublishIndex]} is Published!`)
        this.showModal = false;
      },
    },
  }
  </script>
  