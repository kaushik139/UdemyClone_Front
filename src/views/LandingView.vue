<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
      {{ a }}
      <p>Landing Page</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

// Components

export default defineComponent({
  name: 'LandingView',
  components: {
    
  },
  data() {
    return {
      a: 'data'
    }
  }
});
</script>
