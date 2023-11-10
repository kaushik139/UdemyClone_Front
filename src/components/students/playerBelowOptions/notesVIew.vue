<template>

    <div class="contain">

        <!-- Create NOte -->
      <v-card class="mb-4 p-3" elevation="4" style="width: 90%; margin: auto">
        <v-textarea
          label="New Note"
          rows="2"
          v-model="newNote"
          color="purple"
        >
        </v-textarea>
        <v-btn append-icon="mdi-send" color="purple" @click="post">Create Note</v-btn>
      </v-card>
        
    </div>
    
</template>

<script>

export default {

    computed: {
        
    },

    data:()=>({
        newNote: '',

        
    }),

    methods: {
        async post() {
            
        },
    },

    mounted() {
        
    }

}
</script>