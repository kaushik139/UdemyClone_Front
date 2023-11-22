<template>
    <div>
        <admin-nav></admin-nav>
        <h1>view courses</h1>
     
      <!-- container ending -->  
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import AdminNav from "./adminNav.vue";
  
  // Components
  
  export default defineComponent({
        components: {AdminNav  },

        computed: {
             
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
  