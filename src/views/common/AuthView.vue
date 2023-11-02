<template>
  <div class="contain" style="text-align: center">

    <nav-bar class="navi" :key="currentComp" ></nav-bar>
   <!-- user: {{ userInitial }} -->
    <div class="row">
      <div class="col-md-12 mt-16">
        <!-- Auth Page -->
        <!-- <p>{{ loader }}</p> -->

        <component :is="currentComp"></component>
        <!-- :loader="loader" -->

        <!-- <button class="btn btn-primary" @click="test">Test</button> -->
      </div>
    </div>
  </div>
</template>
    
    <script>
import { defineComponent } from "vue";
import login from "../../components/common/logIn.vue";
import signup from "../../components/common/signUp.vue";
import chalk from 'chalk';
import NavBar from "../../components/common/navBar.vue";


export default defineComponent({
  name: "AuthView",
  components: {
    signup,
    login,
    NavBar,
  },
  computed: {
    userInitial() {
      return this.$store.state.User[0];
    },
    //     currentComp() {
    //   return this.loader === "l" ? login : signup;
    // }
  },
  data() {
    return {
      loader  : '',
      currentComp: "",
      getuser: ''
    };
  },
  methods: {
    test() {
      // console.log(chalk.greenBright('http://localhost:3000/${this.getuser}/newSignup'));
      // console.log(chalk.blue('This text is blue.'));
      // console.log(chalk.red.inverse('This text has a red background.'));
      console.log(chalk.yellow.bgRed('userInitial: '+this.userInitial));


    },
  },
  mounted() {
    // console.log(window.location.href.slice(-1));
    // this.loader = window.location.href.slice(-1);
    this.currentComp = this.loader === "l" ? login : signup;
  },
  updated() {
    this.loader = window.location.href.slice(-1);
    this.currentComp = this.loader === "l" ? login : signup;
    // console.log('done');
  },
});
</script>

<style>
a{
  text-decoration: none;
}
.contain{
  margin-top: 0px;
}
</style>
    