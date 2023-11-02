<template>
  <div class="contain">
    <nav-bar></nav-bar>
    <view-course-page :data="data"></view-course-page>
  </div>
</template>
  
  <script>
import ViewCoursePage from "@/components/common/viewCoursePage.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import NavBar from "../../components/common/navBar.vue";

// Components

export default defineComponent({
  name: "CourseView",
  components: { NavBar, ViewCoursePage },
  /**
   *
   */
  computed: {
    ...mapGetters(["student/getSelectedCourse", "student/getSelectedAction"]),

    courseData() {
      const course = this["student/getSelectedCourse"];
      const action = this["student/getSelectedAction"];
      return {
        ...course,
        dialog: true, // Add additional properties
        action, // Merge the action
      };
    },
  },

  data() {
    return {
      data: {
        dialog: true,
      },
    };
  },

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
    /**
     *
     * @param {*} page
     */
    async mount(page) {},
  },
  /**
   *
   */
  mounted() {
    this.mount(0);
  },
});
</script>
  