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
            @click="currentComponent('LandingPage')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-folder-plus-outline"
            title="Create Content"
            value="CreatePage"
            @click="currentComponent('CreatePage')"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-currency-inr"
            title="Pricing"
            value="pricing"
            :active = false
            @click="currentComponent('PricingPage')"
          ></v-list-item>
          <!-- <v-list-item
            prepend-icon="mdi-bullhorn"
            title="Promotions"
            value="promotions"
            @click="currentComponent('OtherPage')"
          ></v-list-item> -->
          <v-list-item
            prepend-icon="mdi-book-education"
            title="Publish Course"
            value="publishCourse"
            @click="currentComponent('PublishPage')"
          ></v-list-item>
        </v-list>
  
        <!-- <button class="btn btn-primary" @click="test">Test</button> -->
      </v-card>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "RightMenu",
    data: () => ({
      activeTab: "publishCourse",
    }),
    methods: {
      currentComponent(val) {
        this.$store.commit('instructor/changeCurrentComp', val)
      },
      test() {
        this.activeTab = "landingPage";
        console.log("test");
      },
    },
  };
  </script>
  
  <style scoped>
  </style>