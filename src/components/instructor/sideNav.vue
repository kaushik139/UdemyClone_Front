<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
          app permanent
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
             <v-list-item prepend-icon="mdi-home" title="Home" value="home" @click="this.$router.push('/iHome')"></v-list-item>
            <v-list-item prepend-icon="mdi-plus" title="Create Course" value="createCourse" @click="this.$router.push('/create')"></v-list-item>
            <v-list-item prepend-icon="mdi-message" title="Messages" value="messages" @click="this.$router.push('/iMessage')"></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item> -->
          </v-list>

        </v-navigation-drawer>
  
        <!-- <v-main style="height: 250px"></v-main> -->
      </v-layout>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
      };
    },
      methods: {
            createCourse() {
            console.log('CreateCourse');
        }
    }
  };
  </script>
  