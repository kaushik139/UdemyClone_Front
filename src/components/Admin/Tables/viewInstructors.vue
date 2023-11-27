<template>
  <div>
    <admin-nav></admin-nav>

    {{ navTitleGetter }}
    <div class="d-flex">
      <pie class="m-4" :data="dataG" :options="options"></pie>
      <linea class="m-4" :data="dataL"></linea>
    </div>

    <v-table fixed-header height="300px" class="ml-2">
      <thead>
        <tr>
          <th class="text-center">Index</th>
          <th class="text-center">Name</th>
          <th v-if="publishedCourses" class="text-center">Published Courses</th>
          <th class="text-center">Unpublished Courses</th>
          <th v-if="publishedCourses" class="text-center">All Courses</th>
          <!-- <th class="text-center">
          Videos
        </th>
        <th class="text-center">
          Exercises
        </th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in InstructorListGetter" :key="index">
          <td class="text-center" v-if="item.name">{{ index + 1 }}.</td>
          <td class="text-center" v-if="item.name">
            {{ toTitleCase(item.name) }}
          </td>
          <td v-if="publishedCourses && item.name" class="text-center">
            {{ item.publishedCourses }}
          </td>
          <td class="text-center" v-if="item.name">
            {{ item.unpublishedCourses }}
          </td>
          <td v-if="publishedCourses && item.name">
            {{ item.courses?.length }}
          </td>

          <!-- <v-tooltip activator="parent" location="top"
            >View Instructor: {{ toTitleCase(item.name) }}</v-tooltip
          > -->
        </tr>
      </tbody>
    </v-table>
    <!-- container ending -->
  </div>
</template>
  
  <script>
import NavBar from "@/components/common/navBar.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import AdminNav from "../adminNav.vue";
import Linea from "../Graphs/Linea.vue";
import Pie from "../Graphs/Pie.vue";

// Components

export default defineComponent({
  components: { NavBar, AdminNav, Pie, Linea },

  computed: {
    ...mapGetters("admin", [
      "InstructorListGetter",
      "navTitleGetter",
      "overviewGetter",
    ]),

    publishedCourses() {
      return this.navTitleGetter !==
        "View Instructors with no Published Courses"
        ? true
        : false;
    },

    dataG() {
      return {
        labels: [
          "Instructors with Published Courses",
          "Instructors with no Published Courses",
          "All Instructors",
        ],
        datasets: [
          {
            backgroundColor: ["orange", "blue", "green"],
            data: [
              this.overviewGetter.pcInstructors,
              this.overviewGetter.upcInstructors,
              this.overviewGetter.totalInstructors,
            ],
          },
        ],
      };
    },

    dataL() {
      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Instructors Joined",
            backgroundColor: "Cyan",
            data: this.overviewGetter.iMonth,
          },
        ],
      };
    },
  },

  data() {
    return {
      options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
    };
  },

  methods: {
    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  },

  mounted() {  },
});
</script>
  
  <style scoped>
.hover:hover {
  cursor: pointer;
}
</style>