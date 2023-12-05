<template>
    <div>
    <v-toolbar style="background-color: grey;" >
        
        <v-toolbar-title class="text-left ml-12">{{ navTitleGetter }} </v-toolbar-title>

        <!-- dropDown -->
        <!-- <v-btn append-icon="mdi-form-dropdown" elevation="1" class="m-4" style="background-color: rgb(167, 165, 165);">
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
        </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

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
             ...mapGetters('admin',['navTitleGetter'])
        },
        
    data() {
          return {}
    },
  
        methods: {
        
        },

        mounted() {
            
        }
  });
  </script>
  