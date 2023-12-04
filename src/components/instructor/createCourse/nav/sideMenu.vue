<template>
  <v-card class="mainCard">
    <v-card floating permanent>
      <v-list density="compact" nav style="color: rgb(131, 0, 0)">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Plan Course"
          value="planCourse"
          :class="{
            'v-list-item--active1': currentCompGetter === 'PlanCourse',
          }"
          @click="currentComponent('PlanCourse')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-page-next"
          title="Landing Page"
          value="landingPage"
          :class="{
            'v-list-item--active1': currentCompGetter === 'LandingPage',
          }"
          @click="currentComponent('LandingPage')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder-plus-outline"
          title="Create Content"
          value="CreatePage"
          :class="{
            'v-list-item--active1': currentCompGetter === 'CreatePage',
          }"
          @click="currentComponent('CreatePage')"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-currency-inr"
          title="Pricing"
          value="pricing"
          :class="{
            'v-list-item--active1': currentCompGetter === 'Pricing',
          }"
          @click="currentComponent('PricingPage')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-book-education"
          title="Publish Course"
          value="publishCourse"
          :class="{
            'v-list-item--active1': currentCompGetter === 'PublishPage',
          }"
          @click="currentComponent('PublishPage')"
        ></v-list-item>
      </v-list>

    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideMenu",

  computed: {
    // ...mapGetters(['instructor/currentCompGetter']),
    ...mapGetters("instructor", ["currentCompGetter"]),
  },

  data: () => ({
    activeTab: "publishCourse",
  }),
  methods: {
    currentComponent(val) {
      this.$store.commit("instructor/changeCurrentComp", val);
    },
  },
};
</script>

<style >
.active {
  background: #8c2b2baf;
}
.v-list-item--active > .v-list-item__overlay,
.v-list-item[aria-haspopup="menu"][aria-expanded="true"]
  > .v-list-item__overlay {
  display: none !important;
  color: rgb(131,0,0) !important;
}
.v-list-item--active1 {
  color: rgb(107, 2, 2);
  background: rgb(239, 200, 200) !important;
}
</style>