<template>
<div class="contain">
<nav-bar class="navi"></nav-bar>
  <div class="row">
    <div class="col-md-12">
      <side-nav></side-nav>
    </div>
  </div>

  <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h5 class="mb-12">Your Draft Courses:</h5>
          <ul type="none" v-for="(item, index) in Courses" :key="index">
            <li >
              <v-row>
                <v-col cols="3" class="p-0">
                <img src="#" alt="Course Image" style="min-width: 170px; min-height: 100px; border: 2px solid black;">
                </v-col>
                
                <v-col cols="6" >
                <div class="mt-4">
                  {{ index+1 }}. {{ item }}
                </div>
               </v-col>

                <v-col cols="3" >
                <v-btn class="btn mt-6" @click="publish(index)">Publish Now</v-btn>     
                </v-col>

              </v-row>
            </li>
          </ul>

          <!-- Modal dialog -->
      <v-dialog v-model="showModal" max-width="400px">
        <v-card>
          <v-card-title> Publish Course: {{ courseToPublishIndex+1 }}. {{ Courses[courseToPublishIndex] }} </v-card-title>
  
          <!-- Form inside the modal -->
          <v-card-text>
            <v-form @submit.prevent="submitForm">
             
              <div>
  
                <v-btn class="btn btn-secondary" @click="sub">Request Publishing</v-btn>
  
              </div>
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-btn color="rgb(250, 100, 50)" @click="showModal = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

        </v-col>
      </v-row>

      <v-btn class="btn btn-primary" @click="mount">Test</v-btn>
    </v-container>


  
</div>
</template>

<script>
import { defineComponent } from 'vue';
import SideNav from '../../components/instructor/sideNav.vue';
import NavBar from '../../components/common/navBar.vue';
import { mapGetters } from 'vuex';

// Components

export default defineComponent({
  name: 'HomeView',
  components: {
    SideNav,
    NavBar
    
  },

  computed: {
    
  },

  data() {
    return {
      a: 'data',
      Courses: [
          {
            id: '',
            title: '',
            img: '',
          }
        ],
        showModal: false,
        courseToPublishIndex: null, 

    }
  },

  methods: {
        publish(index) {
        this.showModal = true;
          this.courseToPublishIndex = index;
      },
      sub() { 
        console.log('qq');
        alert(`Course: ${this.Courses[this.courseToPublishIndex]} is Published!`)
        this.showModal = false;
      },


       async mount() {
           await this.$store.dispatch('instructor/AllMyCourses', localStorage.getItem('email'));
      }
    },

});
</script>

<style scoped>
.contain{
  text-align: center;
  margin-top: -20px;
}

.navi{
  margin-left: 4%;
  width: 96%;
  margin-top: 20px;
}
</style>
