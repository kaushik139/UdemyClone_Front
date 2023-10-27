<template>
  <v-card class="mainCard">
    aa{{ course }}
    <v-layout>
      <v-navigation-drawer
        style="color: rgb(131, 0, 0)"
        expand-on-hover
        rail
        app
        permanent
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://imgs.search.brave.com/PzngAPChR2G1EghyNpeb6l57-C-wwF0B_VXbrqZORFw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc"
            title="user"
            subtitle="userMail"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            @click="this.$router.push('/iHome')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-plus"
            title="Create Course"
            value="createCourse"
          >
        <!-- modal -->
          <v-dialog
        v-model="dialog"
        activator="parent"
        width="auto"
        persistent
        class="m-2 p-5"
      >
        <v-card class="m-4 p-5">
          <v-btn @click="newCourse">Create New Course</v-btn>
        <v-btn @click="this.$router.push('/create'); this.dialog = false">Continue editing {{ course }}</v-btn>
        </v-card>
      </v-dialog>

        </v-list-item>
          <v-list-item
            prepend-icon="mdi-message"
            title="Messages"
            value="messages"
            @click="this.$router.push('/iMessage')"
          ></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item> -->
        </v-list>
      </v-navigation-drawer>
      <!-- <v-main style="height: 250px"></v-main> -->
    </v-layout>

  </v-card>
</template>
  
  <script>
export default {
  computed: {
    course() {
      return this.$store.state.courseDraft.title;
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    newCourse() {
      localStorage.removeItem('courseDraft');
      this.$store.commit('instructor/clearCourseDraft');
      this.$store.commit('instructor/changeCurrentComp', 'PlanCourse')
      this.dialog = false;
      this.$router.push('/create');
    },
  },
};
</script>
  
  <style scoped>
.mainCard {
  z-index: 2;
}

.mod {
  background: red;
  height: 100px;
  z-index: 999999;
  position: absolute;
  top: 100px;
}
</style>