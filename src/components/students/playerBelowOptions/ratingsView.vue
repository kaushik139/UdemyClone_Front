<template>

    <div class="contain">
        <!-- Overview -->
        <v-card
    class="d-flex flex-column mx-auto py-8 my-4"
    elevation="10"
    height="500"
    width="500"
    style="width: 80%;"
  >
    <div class="d-flex justify-center mt-auto text-h5 ">
      Rating overview
    </div>

    <div class="d-flex align-center flex-column my-auto">
      <div class="text-h2 mt-5">
        3.5
        <span class="text-h6 ml-n3">/5</span>
      </div>

      <v-rating
        :model-value="3.5"
        color="purple-darken-3"
        readonly
        half-increments
      ></v-rating>
      <div class="px-3">3,360 ratings</div>
    </div>

    <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating,i) in 5" :key="i">
        <v-progress-linear
          :model-value="rating * 15"
          class="mx-n5"
          color="purple-darken-1"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ rating }}</span>
          <v-icon icon="mdi-star" color="purple-darken-4" class="mx-3"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ rating * 224 }} </span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  <!-- overview end -->

  <!-- user rating -->
  <v-card class="my-4 p-3" elevation="4" style="width: 80%; margin: auto;">
    <h6>Your Rating</h6>
    <v-rating v-model="userRating" color="purple-darken-3" density="comfortable">
     </v-rating>
     <v-textarea v-model="userRatingText" placeholder="Feedback" color="purple" rows="2" style="width: 80%; margin: auto;">
     </v-textarea>
     <v-btn color="purple" size="small" @click="rate">Rate Now</v-btn>
  </v-card>


  <!-- container end -->
    </div>
</template>

<script>

export default {

    computed: {
    id() {
      return this.$store.state.auth.userData.user._id || null;
    },
        
    },

    data: () => ({
        NetRating: 3,
        userRating: '',
        userRatingText: '',
        
    }),

    methods: {
        async rate() {
            if (this.userRating && this.userRatingText){
            // console.log(this.userRating);
                // console.log(this.userRatingText);
                await this.$store.dispatch('player/SubmitRating', {
                    rating: this.userRating,
                    text: this.userRatingText,
                    id: this.id
                });


            }
            else alert('Fill both Rating and Feedback!')

            await this.$store, dispatch('player/getRating', this.id);
        }
    },

    async mounted() {
        await this.$store.dispatch('player/getRating', this.id);

    }

}
</script>

<style scoped>
.rating-values {
   width: 25px;
}
</style>