<template>
    <div>
      <admin-nav></admin-nav>
      <v-table fixed-header height="300px" class="ml-2">
        <thead>
          <tr>
            <th class="text-left">Index</th>
            <th class="text-left">Name</th>
            <th class="text-left">Courses Purchased</th>
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
          <tr
            v-for="(item, index) in list"
            :key="index"
            class="hover"
          >
            <td class="text-left">{{ index + 1 }}.</td>
            <td class="text-left">{{ toTitleCase(item.name) }}</td>
            <td class="text-left">{{ item.purchasedCourse.length }}</td>
            <!-- <td class="text-left">{{ item.sections.length }}</td>
            <td
              v-if="showStatus"
              class="text-left"
              :style="statusStyle(item.status)"
            >
              {{ toTitleCase(item.status) }}
            </td> -->
  
            <v-tooltip activator="parent" location="top"
              >View Course: {{ item.title }}</v-tooltip
            >
          </tr>
        </tbody>
      </v-table>
      <!-- container ending -->
    </div>
  </template>
    
    <script>
  import studentIndex from "@/store/modules/student/studentIndex";
import { defineComponent } from "vue";
  import { mapGetters } from "vuex";
  import AdminNav from "../adminNav.vue";
  
  // Components
  
  export default defineComponent({
    components: { AdminNav },
  
    computed: {
        ...mapGetters('admin', ['StudentsListGetter', 'navTitleGetter']),

            list() {
                    return this.$store.state.admin.StudentList;
        }
        
    //   showStatus() {
    //     return this.navTitleGetter === "View Unpublished Courses" ? true : this.navTitleGetter === 'View All Courses' ? true : false;
    //   },
    },
  
    data() {
      return {};
    },
  
    methods: {
      toTitleCase(value) {
        if (!value) return "";
        return value.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      },
  
      statusStyle(status) {
        let color =
          status === "published" ? "green" : status === "requested" ? "blue" : "orange";
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
    