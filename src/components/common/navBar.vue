<template>
  <!-- <div class="container" style="width: 100vw; margin: 0px; padding: 0px;"> -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary pt-0" :class="[navbar]">

    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click="$router.push('/')"
        ><span :class="[logo]">U</span>DEMY</a
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

          <li class="nav-item dropdown" v-if="isLogged">
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
              <!-- <li><hr class="dropdown-divider" /></li> -->
            </ul>
          </li>
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
    ...mapGetters(["getUser", "auth/tokenGetter"]),
  },
  data: () => ({
    isLogged: false,
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
    test() {
      console.log(this['auth/tokenGetter']);
    },
  },

  mounted() {
    if (localStorage.getItem("email")) this.isLogged = true;
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
  box-shadow: 0px 0px 5px 0px rgb(225, 60, 60);
}
</style>
