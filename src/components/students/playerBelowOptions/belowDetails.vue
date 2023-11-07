<template>
  <div class="contain">
    <h5>{{ toTitleCase(course.title) }}</h5>
    <v-rating v-model="rating" color="yellow-darken-4"> </v-rating>
    <v-row class="my-6">
      {{ desc }}
    </v-row>
    <v-row class="mt-6">
      <v-col v-if="instructor.image" cols="4">
        <img src="" alt="" />
      </v-col>
      <v-col v-else cols="4">
        <img
          :src="require(`@/assets/account.svg`)"
          alt="NO Image"
          style="width: 100%; height: 40%; margin: 0px"
        />
      </v-col>

      <v-col cols="8">
        <h6>
            By {{ toTitleCase(instructor.name) }},
        </h6>
        <p>
            {{ instructor.bio }}
        </p>


      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    bData: Object,
  },

  computed: {
    ...mapGetters("player", ["getCourse"], "player", ["getInstructor"]),
    instructor() {
      return this.$store.state.player.instructor;
    },
  },

  data: () => ({
    rating: 0,
    course: {},
    desc: "",
    title: "",
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
    await this.$store.dispatch("player/coursePlayAction");

    //     if (this.bData.rating) {
    //         console.log(this.bData);
    //     this.rating = this.bData.rating.netRating;
    //     this.desc = this.bData.description.miniDescription;
    //    }

    if (this.getCourse) {
      this.course = this.getCourse;
      await this.$store.dispatch(
        "player/instructordetails",
        this.course.instructor
      );
      this.rating = this.getCourse.rating.netRating;
      this.desc = this.getCourse.description.fullDescription;
    }

    if (this.getInstructor) {
      console.log("ll");
    }
    if (this.instructor) {
      //   console.log(this.instructor);
    }
  },
};
</script>