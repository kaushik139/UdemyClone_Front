<template>
  <div class="contain">
    <nav-bar></nav-bar>
    
    <!-- add -->
    <v-row class="m-0 bg-danger">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius commodi voluptates architecto nam ex voluptas cum? Facere dolorem id debitis perspiciatis ipsam, nihil reprehenderit unde, provident ipsa impedit tempore, natus itaque. Rerum, quibusdam. Aliquam expedita pariatur nesciunt, est quia deserunt ex minima quae harum ut perferendis exercitationem ullam unde dolorem voluptatum aliquid repellendus accusamus quas dolore non nobis quod blanditiis veniam architecto! Perferendis praesentium consectetur eaque omnis vero eos, magnam quas dolor consequuntur, quos fuga iste aliquid eum voluptates assumenda qui ipsam saepe officiis in reprehenderit nam provident eveniet corporis! Dolorum laudantium aliquam, tenetur aperiam explicabo quibusdam eaque a aspernatur?z Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, incidunt quam? Nam quo repellendus mollitia? Delectus, aperiam! Sequi minus, minima illo beatae repellat doloremque laboriosam quas, illum optio earum excepturi nisi quisquam sint porro molestiae. Totam quidem quisquam ex corrupti <h2 style="margin-left: 48% ;">ADD</h2> nostrum cupiditate ducimus, quia dolorem praesentium, nemo esse quaerat iusto officiis numquam laboriosam voluptatum ipsa. Blanditiis laudantium, nihil odit deleniti temporibus libero? Sit soluta officia itaque porro quidem quaerat repellendus architecto fuga laborum et molestiae, eum cum quo minus non tenetur voluptates facere atque? Odio obcaecati omnis maiores quasi ipsa, animi velit architecto dolorem possimus quisquam nulla rerum id beatae! Maxime neque id delectus tenetur accusantium earum harum, dolor ratione sequi veniam repudiandae excepturi! Nihil maxime nisi asperiores consequatur numquam a quod eaque porro, ut aliquam aut itaque in quisquam. Accusantium eum ullam officiis dolorem, eius iste non vel minus voluptas, sit fugiat hic omnis architecto sunt autem blanditiis rerum culpa repellendus molestiae recusandae est consectetur rem? Fugiat dolorem vel provident eius quos cumque assumenda, libero a consequuntur nisi numquam quasi, sequi ratione repudiandae temporibus corporis! Numquam, labore totam animi fugiat porro incidunt, dicta laboriosam cumque veniam temporibus error dolore unde. Quas a facilis placeat perferendis labore incidunt modi ut!
    </v-row>

    <!-- view courses -->
    <v-row class="m-0 mt-2 mb-10 bg-success" style="gap: 0px;">

      <!-- List of courses -->
      <v-col cols="3" v-for="(course, index) in CoursesArray" :key="index">

        <!-- images -->
        <v-row v-if="course.images.bgImage" class="bg-primary" style="margin-right: -80px; margin-left: 5%; width: 90%;">
          <img :src="'http://localhost:3000/Images/' + course.images.bgImage" alt="NO Image" style="width: 80%; margin: 0px;">
          
          <v-row  style="margin-top: 80%; margin-left: -70%;">
            {{ course.title }}
          </v-row>
        </v-row>
        <v-row v-if="course.images.bgImage === null" class="bg-danger" style="height: 112%; width: 90%; text-align: center;">
          <img src="#" alt="No Image Avaliable" style="width: 80%;">
          
        </v-row>
        <v-row style="margin-top: 80%; margin-left: -70%;">
          {{ course.title }}
        </v-row>
        <!-- images -->

      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import NavBar from "../../components/common/navBar.vue";

// Components

export default defineComponent({
  name: "HomeView",
  components: { NavBar },

  computed: {
    ...mapGetters(['student/getCourses'])
  },

  data() {
    return {
      a: "data",
      page: 0,
      CoursesArray: [],
      imgURL: null,
    };
  },

  methods: {
    async mount(page) {
      await this.$store.dispatch("student/fetchAllCourses", page);
      if (this["student/getCourses"]) {
        this.CoursesArray = this["student/getCourses"]
        this.imgURL = 'http://localhost:3000/Images/${this["student/getCourses"]}'
        console.log(this["student/getCourses"]);
      }
    },
  },

  mounted() {
    this.mount(0);
  },
});
</script>
