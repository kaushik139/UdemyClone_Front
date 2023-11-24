<template>
    <div>
        <admin-nav></admin-nav>

        <pie class="mb-4" :data="dataG" :options="options"></pie>

        <v-table fixed-header height="300px" class="ml-2">
      <thead>
        <tr>
          <th class="text-left">Index</th>
          <th class="text-left">Name</th>
          <th v-if="publishedCourses" class="text-left">Published Courses</th>
          <th class="text-left">Unpublished Courses</th>
          <th v-if="publishedCourses" class="text-left">All Courses</th>
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
          v-for="(item, index) in InstructorListGetter"
          :key="index"
        >
          <td class="text-left">{{ index + 1 }}.</td>
          <td class="text-left">{{ toTitleCase(item.name) }}</td>
          <td v-if="publishedCourses" class="text-left">{{ item.publishedCourses }}</td>
          <td class="text-left">{{ item.unpublishedCourses }}</td>
          <td v-if="publishedCourses"> {{ item.courses.length }}</td>

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
import Pie from "../Graphs/Pie.vue";
  
  // Components
  
  export default defineComponent({
        components: { NavBar, AdminNav, Pie },

        computed: {
              ...mapGetters('admin', ['InstructorListGetter', 'navTitleGetter', 'overviewGetter']),

              publishedCourses() {
                    return this.navTitleGetter !== 'View Instructors with no Published Courses' ? true : false;
            },

    dataG() {
      return {
        labels: ["Instructors with Published Courses", "Instructors with no Published Courses", "All Instructors"],
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
        },
        
    data() {
          return {
            options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
          }
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

        mounted() {
        }
  });
  </script>
  
  <style scoped>
  .hover:hover {
    cursor: pointer;
  }
  </style>