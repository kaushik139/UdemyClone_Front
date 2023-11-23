<template>
    <div>

        <v-dialog v-model="data" style="background-color: white;" fullscreen transition="dialog-bottom-transition">
      <div>
        <v-row style="height: 5%;">
        <v-btn class="rounded-pill mt-6 mr-6" style="margin-left: auto;" @click="data = false">Close</v-btn>
      </v-row>
       <div style="margin-top: 6%; margin-left: 2%;">
        <!-- <course-dialog></course-dialog> -->
        <v-row>
            <v-col cols="6" class="bg-danger">
                stats
            </v-col>
            <v-col cols="6" class="bg-success">
                text
            </v-col>
        </v-row>
       </div>
      </div>
    </v-dialog>



       


      <!-- container ending -->  
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
import { mapGetters } from "vuex";
  
 
  
  export default defineComponent({

    props: {
    data: Boolean,
  },

        computed: {
             ...mapGetters('admin',['navTitleGetter'])
        },

        
        
    data() {
          return {
            
          }
    },
  
        methods: {
        
        },

        mounted() {
            
        }
  });
  </script>
  