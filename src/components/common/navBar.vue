<template>
  <!-- <div class="container" style="width: 100vw; margin: 0px; padding: 0px;"> -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary pt-0" :class="[navbar]">
    <div class="container-fluid">
      <span class="navbar-brand" href="#" @click="logoClick"
        ><span :class="[logo]">U</span>DEMY</span
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li> -->
          <li class="nav-item" v-if="!isLogged">
            <router-link to="/auth/l" class="nav-link">Login</router-link>
            <!-- <a class="nav-link" href="#">Login</a> -->
          </li>
          <li class="nav-item" v-if="!isLogged">
            <router-link to="/auth/s" class="nav-link">Sign Up</router-link>
            <!-- <a class="nav-link" href="#">Sign Up</a> -->
          </li>
          <li
            v-if="showTeachBtn === true"
            class="nav-item"
            @click="switchToTeacher"
          >
            <router-link to="/auth/l" class="nav-link">Teach</router-link>
            <!-- <a class="nav-link" href="#">Sign Up</a> -->
          </li>

          <li
            v-if="showStudentBtn === true"
            class="nav-item"
            @click="switchToStudent"
          >
            <router-link to="/auth/s" class="nav-link">Student</router-link>
            <!-- <a class="nav-link" href="#">Sign Up</a> -->
          </li>

          <!-- <li class="nav-item dropdown" v-if="isLogged">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Programming</a></li>
              <li><a class="dropdown-item" href="#">Data Science</a></li>
              <li><a class="dropdown-item" href="#">Web Development</a></li>
            </ul>
          </li> -->
        </ul>
        <form
          v-if="isLogged"
          class="d-flex border border-1 border-dark rounded-pill p-0"
          style="background-color: white !important"
          role="search"
        >
          <input
            class="form-control me-2 rounded-pill search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style="border: none"
          />
          <button class="btn p-0 m-0" type="submit">
            <i
              class="fa-solid fa-magnifying-glass"
              style="color: #000000; margin-right: 8px"
            ></i>
          </button>
        </form>

        {{ ["auth/userTokenGetter"] }}

        <!-- user Profile chip -->
        <div v-if="['auth/userDataGetter'].name">
          <v-menu
            v-model="menu"
            location="top start"
            origin="top start"
            transition="scale-transition"
          >
            <template v-slot:activator="{ props }">
              <v-chip pill v-bind="props" link>
                <v-avatar start>
                  <v-img
                    v-if="userDetails.Image"
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                  <v-img v-else src="../../assets/account.svg"></v-img>
                </v-avatar>
                {{ userDetails.name }}
                <!-- {{this['auth/userDataGetter'].user.name}} -->
              </v-chip>
            </template>

            <v-list bg-color="white">
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar
                    v-if="userDetails.Image"
                    image="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-avatar>
                  <v-avatar
                    v-else
                    :image="require('@/assets/account.svg')"
                  ></v-avatar>
                </template>

                <v-list-item-title>{{ userDetails.name }}</v-list-item-title>

                <v-list-item-subtitle>{{
                  userDetails.email
                }}</v-list-item-subtitle>

                <template v-slot:append>
                  <v-btn icon variant="text" @click="menu = false">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-list>
              <v-list-item link prepend-icon="mdi-pencil">
                <v-list-item-subtitle>Edit </v-list-item-subtitle>

                <!-- Profile Edit Dialog -->
                <v-dialog
                  v-model="editDialog"
                  activator="parent"
                  width="60%"
                  height="80%"
                >
                  <v-card style="width: 90%; margin: 10%">
                    <v-btn
                      :color="dialogColor"
                      style="margin-left: auto"
                      elevation="0"
                      @click="editDialog = false"
                    >
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>

                    <v-card style="width: 95%; height: 95%; margin: auto">
                      <h4>Edit Profile</h4>

                      <!-- FORM -->
                      <form>
                        <v-text-field
                          v-model="editName"
                          label="Name"
                          required
                        ></v-text-field>

                        <v-file-input
                          label="Change Profile Image"
                          variant="filled"
                          prepend-icon="mdi-camera"
                          v-model="editImage"
                        ></v-file-input>

                        <v-btn class="me-4" @click="editProfile">
                          submit
                        </v-btn>
                        <v-btn @click="clear"> clear </v-btn>
                      </form>
                      <v-card-actions> </v-card-actions>
                    </v-card>
                  </v-card>
                </v-dialog>
              </v-list-item>

              <!-- Logout Dialog -->
              <v-list-item link prepend-icon="mdi-logout">
                <v-list-item-subtitle>Logout</v-list-item-subtitle>

                <v-dialog v-model="logoutDialog" activator="parent" persistent style="text-align: center; width: 40%;">
                  <v-card>
                    <h5>Are you sure you want to Louout?</h5>
                    <!-- dialog butons -->
                    <v-card-actions >
                     <v-col cols="6">
                      <v-btn
                        color="red-darken-1"
                        variant="text"
                        @click="logout"
                      >
                        Yes
                      </v-btn>
                     </v-col>
                     <v-col cols="6">
                      <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="logoutDialog = false"
                      >
                        No
                      </v-btn>
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- <button class="btn" @click="test">test</button> -->
      </div>
    </div>
  </nav>
  <!-- </div> -->
</template>
  
  <script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    navbar() {
      return this.getUser === "instructors" ? "navbarIns" : "navbarStu";
      // return localStorage.getItem('role') === 'instructors' ? 'navbarIns' : 'navbarStu';
    },
    logo() {
      return this.getUser === "instructors" ? "logoIns" : "logoStu";
      // return localStorage.getItem('role') === 'instructors' ? 'logoIns' : 'logoStu';
    },
    dialogColor() {
      this.getUser === "instructors" ? "rgb(131, 0, 0)" : "purple";
    },
    showTeachBtn() {
      //   if (this.getUser === 'student') {
      //     console.log("this.getUser === 'student'");
      //       if (this['auth/tokenGetter'] === '') {
      //         console.log("this['auth/tokenGetter'] === ''");
      //         return true;
      //     }
      //   }
      // else return false;

      return this.getUser === "students"
        ? this["auth/tokenGetter"] === ""
          ? true
          : false
        : false;
      //  return localStorage.getItem('role') === 'students' || localStorage.getItem('role') === null ? (localStorage.getItem('token') === null ? true : false) : false;
    },

    showStudentBtn() {
      return this.getUser === "instructors"
        ? this["auth/tokenGetter"] === ""
          ? true
          : false
        : false;
    },
    ...mapGetters(["getUser", "auth/tokenGetter", "auth/userDataGetter"]),
  },
  data: () => ({
    isLogged: false,
    menu: false,
    userDetails: {},
    editDialog: false,
    editImage: null,
    editName: "",
    logoutDialog: false,
  }),

  methods: {
    switchToTeacher() {
      this.$store.commit("changeUser", "instructors");
      localStorage.setItem("role", "instructors");
    },
    switchToStudent() {
      this.$store.commit("changeUser", "students");
      localStorage.setItem("role", "students");
    },
    logoClick() {
      // this.$router.push("/auth/l");
      console.log(this.isLogged);
      // console.log(this.getUser);
      // this.$router.push('/sHome')
      // this.$router.push("/auth/l");

      this.isLogged === true
        ? this.getUser === "students"
          ? this.$router.push("/sHome")
          : this.$router.push("/iHome")
        : this.$router.push("/auth/l");
    },

    async editProfile() {
      if (this.editName.length > 2) {
        this.$store.dispatch("auth/editProfileAction", {
          name: this.editName,
          image: this.editImage ? this.editImage[0] : "",
        });
      }
      this.editDialog = false;
      await this.mount();
    },

    async logout() {
      this.logoutDialog = false, 
          await this.$store.dispatch("auth/logout");
      this.router.push('/')
    },

    test() {
      console.log(this["auth/tokenGetter"]);
    },

    async mount() {
      // console.log(';;');
      await this.$store.dispatch("auth/refreshUserAction", {
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
      });

      if (localStorage.getItem("email")) this.isLogged = true;
      if (this["auth/userDataGetter"])
        this.userDetails = this["auth/userDataGetter"].user;
      this.editName = this["auth/userDataGetter"].user.name;
    },
  },

  async mounted() {
    await this.mount();
  },
};
</script>

<style scoped>
.navbarStu {
  box-shadow: 0.5px 0.5px 5px 0.5px purple;
}
.logoStu {
  color: purple;
  font-size: 30px;
}

.navbarIns {
  box-shadow: 0.5px 0.5px 5px 0.5px rgb(131, 0, 0);
}
.logoIns {
  color: rgb(131, 0, 0);
  font-size: 30px;
}

.search:focus {
  box-shadow: none;
}

form:focus-within {
  box-shadow: 0px 0px 5px 0px rgb(206, 60, 225);
}
</style>
