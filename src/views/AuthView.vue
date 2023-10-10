<template>
  <div class="container mt-2" style="text-align: center">
    <div class="row">
      <div class="col-md-12">
        Auth Page
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
import login from "../components/logIn.vue";
import signup from "../components/signUp.vue";
import chalk from 'chalk';


export default defineComponent({
  name: "AuthView",
  components: {
    signup,
    login,
  },
  computed: {
    // loader() {
    //   return window.location.href.slice(-1);
    // },
    //     currentComp() {
    //   return this.loader === "l" ? login : signup;
    // }
  },
  data() {
    return {
      loader  : '',
      currentComp: "",
      getuser: 'jj'
    };
  },
  methods: {
    test() {
      console.log(chalk.greenBright('http://localhost:3000/${this.getuser}/newSignup'));
      console.log(chalk.blue('This text is blue.'));
      console.log(chalk.red.inverse('This text has a red background.'));
      console.log(chalk.yellow.bgRed('hello'));


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
</style>
    