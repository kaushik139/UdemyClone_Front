<template>
  <div class="contain">
    <!-- main Card -->
    <v-card style="width: 90%; margin: auto;" elevation="4" class="my-4">
        <!-- Display Querries -->
      <v-row v-if="QnA.length" class="m-4 p-8">
        <v-card>
        <v-card v-for="(querry, index) in QnA" :key="index">
            <v-col cols="3">
                {{ querry.querry.studentID }}
            </v-col>
        </v-card>
        </v-card>
      </v-row>
      <!-- in case of no Querry -->
      <v-row v-else class="m-4" style="width: 100vw !important">
        <v-card style="width: 55%" elevation="0">
          <h4>No Qurries Posted Yet!</h4>
          <span style="font-size: 12px; color: purple;">Post One Now!</span>
        </v-card>
      </v-row>
<!-- Create Qurries -->
        <v-card class="mb-4 p-3" elevation="4" style="width: 90%; margin: auto;">
            <h6>New Querry?</h6>
            <!-- <h6>Post a Querry</h6> -->
        <v-textarea label="Create a Query" rows="2" v-model="querry" color="purple">
        </v-textarea>
        <v-btn append-icon="mdi-send" color="purple" @click="post">POST</v-btn>
    </v-card>
    
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["player/getCourse"]),
    sectionIndex() {
      return localStorage.getItem("section") || 0;
    },
    viewIndex() {
      return localStorage.getItem("viewIndex") || 0;
    },
    viewType() {
      return localStorage.getItem("viewType") || "video";
    },
  },

  data: () => ({
      QnA: [],
    querry: '',
  }),

    methods: {

        async post() {
            if (this.querry !== '') {
                const id = await this.$store.state.auth.userData.user._id;

                await this.$store.dispatch('player/PostQnA', {
                    querry: this.querry,
                    sectionIndex: this.sectionIndex,
                    viewIndex: this.viewIndex,
                    viewType: this.viewType,
                    id: id
                })
                await this.mount();
            }
            else alert('Empty Field!')


        },

        async mount() {
            
    if (this["player/getCourse"]) {
      // console.log(this['player/getCourse'].sections[this.sectionIndex][this.viewType][this.viewIndex].QnA);

      this.QnA =
        this["player/getCourse"].sections[this.sectionIndex][this.viewType][
          this.viewIndex
        ].QnA;
    }
    // console.log(this.sectionIndex);
    // console.log(this.viewIndex);
    // console.log(this.viewType);

    // this.QnA = this['player/getCourse'].sections
        }
  },

    async mounted() {
        await this.mount();
  },
};
</script>