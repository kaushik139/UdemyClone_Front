<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
      <h4>This is Landing Page</h4>
      
      <v-btn class="bg-dark text-white mt-5" @click="start">Get Started</v-btn>
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

    }
  },

  methods: {
    async start() {
      this.$store.state.User = 'students';
      this.$router.push('/auth/l');
    }
  }
});
</script>
