<template>
  <form @submit.prevent="su">
    <v-text-field
      label="Course Name"
      data-value="lol"
      v-model="planData.name"
    ></v-text-field>

    <v-textarea
      label="Mini Description"
      v-model="planData.miniDesc"
    ></v-textarea>

    <v-select
      :items="items1"
      label="Category"
      v-model="planData.category"
    ></v-select>

    <v-btn name="submit-button" class="me-4 btn" @click="submit">
      submit
    </v-btn>

    <v-btn name="clear" class="btn" @click="handleReset"> clear</v-btn>
  </form>
</template>


  <script >
import { mapGetters } from "vuex";
export default {
  name: "PlanCourse",

  computed: {
    ...mapGetters(["instructor/courseDraftGetter"]),
  },

  data: () => ({
    items1: ["Category A", "Category B", "Category C"],
    planData: {
      name: "",
      miniDesc: "",
      category: "",
      email: "",
    },
  }),

  methods: {
    async submit() {
      if (
        this.planData.name !== "" &&
        this.planData.miniDesc !== "" &&
        this.planData.category !== ""
      ) {
        this.planData.email = localStorage.getItem("email");
        console.log(this.planData);
        console.log(";;");

        await this.$store.dispatch(
          "instructor/planCourseAction",
          this.planData
        );

        // alert("Course Planning Completed!");
        // this.$emit("changeComp", "LandingPage");
      } else alert("Please Fill the Form Completely!");
    },
    handleReset() {
      // console.log(';;');
      this.planData.name = "";
      this.planData.miniDesc = "";
      this.planData.category = "";
    },

    mount() {
    
    },
  },

 async mounted() {
    if(localStorage.getItem("courseDraft")) await this.$store.dispatch("instructor/getDraftCourse",localStorage.getItem("courseDraft"));
        if (this["instructor/courseDraftGetter"]) {
          // console.log(this['instructor/courseDraftGetter']);
          // console.log(this['instructor/courseDraftGetter'].title);
          this.planData.name = this["instructor/courseDraftGetter"].title;
          this.planData.miniDesc =
            this["instructor/courseDraftGetter"].miniDescription;
          this.planData.category =
            this["instructor/courseDraftGetter"].category;
        }
    },
};
</script>

<style scoped>
.btn {
  background-color: rgb(248, 123, 123);
}
.btn:hover {
  color: white;
  background-color: rgb(131, 0, 0);
}
</style>