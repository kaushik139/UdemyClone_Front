<template>
    <v-card>
      <v-layout>
        <v-card
          floating
          permanent
        >
          <v-list
            density="compact"
            nav
          >
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
          </v-list>
        </v-card>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </v-card>
  </template>

<script>
  
export default {
  name: 'SideMenu',

  data: () => ({
    return: {

    }
  })
}
</script>