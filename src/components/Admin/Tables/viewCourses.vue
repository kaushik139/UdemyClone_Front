<template>
  <div>
    <admin-nav></admin-nav>
    <div class="d-flex">
      <pie class="m-4" :data="dataG" :options="options"></pie>
      <linea class="m-4" :data="dataL"></linea>
    </div>
    <v-divider></v-divider>
    <v-data-table
      v-if="typeof publishedCoursesGetter !== 'string'"
      class="ml-2"
      :items-per-page="1"
        >
      <thead>
        <tr>
          <th class="text-left">Index</th>
          <th class="text-left">Name</th>
          <th class="text-left">Instructor</th>
          <th class="text-left">Sections</th>
          <th v-if="showStatus" class="text-left">Status</th>
          <!-- <th class="text-left">
          Videos
        </th>
        <th class="text-left">
          Exercises
        </th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in publishedCoursesGetter"
          :key="index"
          :class="item.status === 'requested' ? 'hover' : ''"
          @click="view(item._id, item.status)"
        >
          <td class="text-left">{{ index + 1 }}.</td>
          <td class="text-left">{{ toTitleCase(item.title) }}</td>
          <td class="text-left">{{ toTitleCase(item.instructorName) }}</td>
          <td class="text-left">{{ item.sections.length }}</td>
          <td
            v-if="showStatus"
            class="text-left"
            :style="statusStyle(item.status)"

          >
            {{ toTitleCase(item.status) }}
          </td>

          <v-tooltip
            v-if="item.status === 'requested'"
            activator="parent"
            location="top"
            >Review Course: {{ toTitleCase(item.title) }}</v-tooltip
          >
        </tr>
      </tbody>
    </v-data-table>
    <div v-if="typeof publishedCoursesGetter === 'string'">
      <h4>No Data!</h4>
    </div>
    <!-- ////////////////////VIew Course Dialog/////////////////////////// -->
    <dialog-course
     :data="courseData"
        :key="courseData.dialog"></dialog-course>
    <!-- ///////////////////////////////////////////////////////////////// -->

    <!-- container ending -->
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import AdminNav from "../adminNav.vue";
import DialogCourse from "../dialogCourse.vue";
import Linea from "../Graphs/Linea.vue";
import Pie from "../Graphs/Pie.vue";

// Components
export default defineComponent({
  components: { AdminNav, Pie, Linea, DialogCourse },

  computed: {
    ...mapGetters("admin", [ "publishedCoursesGetter", "navTitleGetter", "overviewGetter", ]),

    showStatus() {
      return this.navTitleGetter === "View Unpublished Courses"
        ? true
        : this.navTitleGetter === "View All Courses"
        ? true
        : false;
    },

    unpublishedCourses() {
      const counter =
        this.overviewGetter.unpublishedCourses -
        this.overviewGetter.requests.length;
      return counter;
    },

    requestedCourses() {
      return this.overviewGetter.requests.length;
    },

    dataG() {
      return {
        labels: [
          "Published Courses",
          "Unpublished Courses",
          "Requested Courses",
        ],
        datasets: [
          {
            backgroundColor: ["green", "blue", "orange"],
            data: [
              this.overviewGetter.publishedCourses,
              this.unpublishedCourses,
              this.requestedCourses,
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
          "December"
        ],
        datasets: [
          {
            label: "Courses Published",
            backgroundColor: "blue",
            data: this.overviewGetter.cMonth,
          },
          // {
          //   label: "Data OnTWO",
          //   backgroundColor: "green",
          //   data: [140, 139, 110, 140, 139, 80, 140],
          // },
        ],
      };
    },

  },

  data() {
    return {
      dialog: false,
      // table: new DataTable('#myTable'),
      options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
      courseData: { dialog: false },

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

      view(id, status) {
          if (status === 'requested') {
            // console.log(id);
            this.courseData = {
            id: id,
            dialog: true,
        }   
        }
    },


  },
    mounted() {

    // console.log(this.overviewGetter);
  },
});
</script>

  <style scoped>
.hover:hover {
  cursor: pointer;
}

</style>
  