<template>
  <div>
    <admin-nav></admin-nav>

    <div class="d-flex">
      <pie class="m-4" :data="dataG" :options="options"></pie>
      <linea class="m-4" :data="dataL"></linea>
    </div>
    <v-divider></v-divider>
    <v-table fixed-header height="300px" class="ml-2">
      <thead>
        <tr>
          <th class="text-center">Index</th>
          <th class="text-center">Student Name</th>
          <th class="text-center">Courses Purchased</th>
          <!-- <th class="text-left">Sections</th>
            <th v-if="showStatus" class="text-left">Status</th> -->
          <!-- <th class="text-left">
            Videos
          </th>
          <th class="text-left">
            Exercises
          </th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td class="text-center">{{ index + 1 }}.</td>
          <td class="text-center">{{ toTitleCase(item.name) }}</td>
          <td class="text-center">{{ item.purchasedCourse.length }}</td>
          <!-- <td class="text-left">{{ item.sections.length }}</td>
            <td
              v-if="showStatus"
              class="text-left"
              :style="statusStyle(item.status)"
            >
              {{ toTitleCase(item.status) }}
            </td> -->

          <!-- <v-tooltip activator="parent" location="top"
              >View Course: {{ item.title }}</v-tooltip
            > -->
        </tr>
      </tbody>
    </v-table>
    <v-divider></v-divider>
    <!-- container ending -->
  </div>
</template>
    
    <script>
import studentIndex from "@/store/modules/student/studentIndex";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import AdminNav from "../adminNav.vue";
import Pie from "../Graphs/Pie.vue";
import Linea from "../Graphs/Linea.vue";

// Components

export default defineComponent({
  components: { AdminNav, Pie, Linea },

  computed: {
    ...mapGetters("admin", [
      "StudentsListGetter",
      "navTitleGetter",
      "overviewGetter",
    ]),

    list() {
      return this.$store.state.admin.StudentList;
    },

    dataG() {
      return {
        labels: [
          "Students with purchased Courses",
          "Students without purchased Courses",
          "All Students",
        ],
        datasets: [
          {
            backgroundColor: ["green", "blue", "orange"],
            data: [
              this.overviewGetter.pcStudents,
              this.overviewGetter.upcStudents,
              this.overviewGetter.totalStudents,
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
            label: "Students Joined",
            backgroundColor: "green",
            data: this.overviewGetter.sMonth,
          },
        ],
      };
    },

    //   showStatus() {
    //     return this.navTitleGetter === "View Unpublished Courses" ? true : this.navTitleGetter === 'View All Courses' ? true : false;
    //   },
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

    statusStyle(status) {
      let color =
        status === "published"
          ? "green"
          : status === "requested"
          ? "blue"
          : "orange";
      return {
        color: color,
      };
    },
  },

  mounted() {
    //   console.log(this.$store.state.admin.StudentList);
    // console.log(this.StudentsListGetter);
  },
});
</script>
  
    <style scoped>
.hover:hover {
  cursor: pointer;
}
</style>
    