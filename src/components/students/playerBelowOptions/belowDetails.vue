<template>

    <div class="contain">
        <h5>{{ toTitleCase(course.title) }}</h5>
        <v-rating v-model="course.rating.netRating" color="yellow">
        </v-rating>
        <v-row>
            mini
        </v-row>
        <v-row>
            full
        </v-row>
        <v-row>
            <v-col cols="4">
                instructor image
            </v-col>
            <v-col cols="8">
                instructor bio
            </v-col>
        </v-row>
        
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'

export default {

    computed: {
        course() {
            return this['player/getCourse']
        },
        ...mapGetters(["player/getCourse"])
    },

    data:()=>({
        
    }),

    methods: {
         /**
     *
     * @param {*} value
     */
    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    },

    async mounted() {
        // await this.$store.dispatch('player/getCourse')
    }

}
</script>