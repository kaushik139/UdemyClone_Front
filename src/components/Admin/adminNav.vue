<template>
    <div>
    <v-toolbar style="background-color: grey;" >
      <v-btn append-icon="mdi-menu" class="ml-5">
        Select Courses
        <v-menu activator="parent" transition="scale-transition" location="bottom" open-on-hover>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      </v-btn>

      <v-toolbar-title class="text-left ml-12">View Courses: </v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

    </v-toolbar>
        
     
      <!-- container ending -->  
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
import { mapGetters } from "vuex";
  
  // Components
  
  export default defineComponent({

        computed: {
             
        },
        
    data() {
          return {
            items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
          }
    },
  
        methods: {
        
        },

        mounted() {
            
        }
  });
  </script>
  