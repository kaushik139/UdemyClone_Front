<template>
    <div>



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
          return {
            
          }
    },
  
        methods: {
        
        },

        mounted() {
            
        }
  });
  </script>
  