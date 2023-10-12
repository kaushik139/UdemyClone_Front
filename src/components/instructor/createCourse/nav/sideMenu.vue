<template>
  <v-card class="mainCard">
    <v-card floating permanent>
      <v-list density="compact" nav style="color: rgb(131, 0, 0)">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Plan Course"
          value="planCourse"
          @click="currentComponent('PlanCourse')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-page-next"
          title="Landing Page"
          value="landingPage"
          @click="currentComponent('OtherPage')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder-plus-outline"
          title="Create Content"
          value="createContent"
          @click="currentComponent('CreatePage')"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-currency-inr"
          title="Pricing"
          value="pricing"
          @click="currentComponent('OtherPage')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-bullhorn"
          title="Promotions"
          value="promotions"
          @click="currentComponent('OtherPage')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-book-education"
          title="Publish Course"
          value="publishCourse"
          @click="currentComponent('OtherPage')"
        ></v-list-item>
      </v-list>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "SideMenu",
  emits: {
    currentComp: String,
  },
  data: () => ({
    return: {},
  }),
  methods: {
    currentComponent(val) {
      this.$emit("currentComp", val);
    },
  },
};
</script>

<style scoped>
</style>