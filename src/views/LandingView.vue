<template>
  <div>
    <!-- Navbar -->
    <nav-bar></nav-bar>

    <!-- Image Carousel -->
    <v-row class="text-center bg-success">
      <v-carousel
        cycle
        height="600"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet height="100%">
            <!-- :color="colors[i]" -->
            <div class="d-flex fill-height justify-center align-center">
              <div class="w-100 h-70 relative">
                <!-- displayed image -->
                <img
                  :src="require(`@/assets/` + slide.link)"
                  :alt="slide"
                  style="width: 100%"
                />



                <!-- slide Headding -->
                <div
                  class=""
                  style="
                    position: absolute;
                    color: white;
                    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
                    left: 10%;
                    top: 60%;
                  "
                >
                  <h2>{{ slide.head }}</h2>
                </div>

                <!-- slide Text -->
                <div
                  class="rounded-pill"
                  style="
                    color: white;
                    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                    position: absolute;
                    /* box-shadow: 6px 6px 10px -5px white; */
                    top: 70%;
                    left: 2%;
                    right: 2%;
                  "
                >
                  {{ slide.text }}
                </div>
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

       <!-- get started button -->
       <div style="position: absolute; top: 50%; left: 45%">
                  <v-btn
                    class="text-white mt-5"
                    size="large"
                    style="background-color: purple"
                    >Get Started
                    <!-- @click="start" -->
                    <!-- @click="dialog = true" -->

                    <!-- login modal -->
                    <v-dialog v-model="dialog" activator="parent" width="500" height="400">
                        
                        <log-in></log-in>

                        <v-card-actions>
                          <!-- <v-btn color="primary" block @click="dialog = false"
                            >Close Dialog</v-btn -->
                          
                        </v-card-actions>
                    </v-dialog>
                  </v-btn>
                </div>

    </v-row>
    <!-- carousel ending -->

  </div>
</template>

<script>
import NavBar from "@/components/common/navBar.vue";
import LogIn from "@/components/common/logIn.vue";
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "LandingView",
  components: { NavBar, LogIn },
  data() {
    return {
      dialog: false,
      
      slides: [
        {
          link: "UDWall1.jpg",
          head: "STUDY",
          text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, consequatur! Dolorum assumenda molestiae voluptas ab sunt optio. Nam ea expedita minus eligendi suscipit dolorem praesentium est quasi in ipsa excepturi, totam non molestias illo beatae velit ipsam accusamus impedit tenetur nisi iure facere. Tempore, quam repellendus! Consectetur quod corrupti sunt?",
        },
        {
          link: "UDWall2.jpg",
          head: "Get Creative",
          text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, consequatur! Dolorum assumenda molestiae voluptas ab sunt optio. Nam ea expedita minus eligendi suscipit dolorem praesentium est quasi in ipsa excepturi, totam non molestias illo beatae velit ipsam accusamus impedit tenetur nisi iure facere. Tempore, quam repellendus! Consectetur quod corrupti sunt?",
        },
        {
          link: "UDwall3.jpg",
          head: "Huge Community",
          text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, consequatur! Dolorum assumenda molestiae voluptas ab sunt optio. Nam ea expedita minus eligendi suscipit dolorem praesentium est quasi in ipsa excepturi, totam non molestias illo beatae velit ipsam accusamus impedit tenetur nisi iure facere. Tempore, quam repellendus! Consectetur quod corrupti sunt?",
        },
        {
          link: "UDwall4.jpg",
          head: "Discuss with Peers",
          text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, consequatur! Dolorum assumenda molestiae voluptas ab sunt optio. Nam ea expedita minus eligendi suscipit dolorem praesentium est quasi in ipsa excepturi, totam non molestias illo beatae velit ipsam accusamus impedit tenetur nisi iure facere. Tempore, quam repellendus! Consectetur quod corrupti sunt?",
        },
      ],
    };
  },

  methods: {
    async start() {
      this.$store.state.User = "students";
      this.$router.push("/auth/l");
    },
  },
});
</script>
