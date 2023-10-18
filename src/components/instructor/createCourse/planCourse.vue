<template>
  <form @submit.prevent="submit">
    <v-text-field label="Course Name" v-model="planData.name"></v-text-field>

    <v-textarea
      label="Mini Description"
      v-model="planData.miniDesc"
    ></v-textarea>

    <v-select
      :items="items1"
      label="Category"
      v-model="planData.category"
    ></v-select>

    <v-btn class="me-4 btn" type="submit"> submit </v-btn>

    <v-btn class="btn" @click="handleReset"> clear </v-btn>
  </form>
</template>


  <script >
import { mapGetters } from 'vuex'
export default {
  name: "PlanCourse",

   computed: {
 ...mapGetters(['instructor/courseDraftGetter'])
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

        this.planData.email = localStorage.getItem('email');
        console.log(this.planData);

        await this.$store.dispatch("instructor/planCourseAction", {
          value: this.planData,
        });

        // alert("Course Planning Completed!");
        // this.$emit("changeComp", "LandingPage");
      }
        else alert("Please Fill the Form Completely!");
    },
    handleReset() {
      this.planData.name = "";
      this.planData.miniDesc = "";
      this.planData.category = "";
    },
  },

    mounted() {
        setTimeout(() => {
          if (this['instructor/courseDraftGetter']) {
          // console.log(this['instructor/courseDraftGetter']);
          // console.log(this['instructor/courseDraftGetter'].title);
              this.planData.name = this['instructor/courseDraftGetter'].title;
              this.planData.miniDesc = this['instructor/courseDraftGetter'].miniDescription;
              this.planData.category = this['instructor/courseDraftGetter'].category;

      }
        },1)
  }

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