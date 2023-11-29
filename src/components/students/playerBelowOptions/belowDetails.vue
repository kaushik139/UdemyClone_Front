<template>
  <div class="contain">
  
    <v-row class="mt-6 ">
      <v-col v-if="getInstructor.profileImage" cols="4">
        <img :src="instructorImageURL" alt="" data-value="image"/>
        <h6 class="mt-2" data-value="instructor-name">
        <!-- instructor's Name -->
            {{ toTitleCase(getInstructor.name) }}
        </h6>
      </v-col>
      <v-col v-else cols="4">
        <img
          :src="require(`@/assets/account.svg`)"
          alt="NO Image"
          style="width: 100%; height: 40%; margin: 0px"
        />
        <h6 class="mt-2" data-value="instructor-name">
        <!-- instructor's Name -->
            {{ toTitleCase(getInstructor.name) }}
        </h6>
      </v-col>
     
      <v-col cols="8" style="line-break: anywhere;">
        <h5 data-value="course-title">{{ toTitleCase(course.title) }}</h5>
    <v-rating v-model="rating" color="purple-darken-3" density="compact" disabled> </v-rating>
    <v-row class="my-6" data-value="course-fullDescription">
      {{ desc }}
    </v-row>
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
    ...mapGetters("player", ["getCourse", "getInstructor"]),
    instructorImageURL() {
      return `http://localhost:3000/Images/${this.getInstructor.profileImage}`;
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

    if (this.getCourse) {
      this.course = this.getCourse;
      await this.$store.dispatch(
        "player/instructordetails",
        this.course.instructor
      );
      this.rating = this.getCourse.rating.netRating;
      this.desc = this.getCourse.description.fullDescription;
    }
  },
};
</script>