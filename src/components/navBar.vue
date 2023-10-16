<template>
  <!-- <div class="container" style="width: 100vw; margin: 0px; padding: 0px;"> -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary" :class="[navbar]">

    <div class="btn btn" @click="test">Test</div>

    <div class="container-fluid">
      <a class="navbar-brand" href="#"><span :class="[logo]">U</span>DEMY</a>
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
          <li class="nav-item">
            <router-link to="/auth/l" class="nav-link">Login</router-link>
            <!-- <a class="nav-link" href="#">Login</a> -->
          </li>
          <li class="nav-item">
            <router-link to="/auth/s" class="nav-link">Sign Up</router-link>
            <!-- <a class="nav-link" href="#">Sign Up</a> -->
          </li>
          <li v-if="showTeachBtn === true" class="nav-item" @click="switchToTeacher">
            <router-link to="/auth/s" class="nav-link">Teach</router-link>
            <!-- <a class="nav-link" href="#">Sign Up</a> -->
          </li>
          <li class="nav-item dropdown">
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
          class="d-flex border border-1 border-dark rounded-pill p-0"
          style="background-color: white !important"
          role="search"
        >
          <input
            class="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style="border: none"
          />
          <button class="btn p-0 m-0" type="submit">
            <i class="fa-solid fa-magnifying-glass" style="color: #000000; margin-right: 8px;"></i>
          </button>
        </form>
      </div>
    </div>
  </nav>
  <!-- </div> -->
</template>
  
  <script>
import { mapGetters } from 'vuex';

export default {
      name: "NavBar",
      computed:{
            navbar() {
                return this.getUser === 'instructors' ? 'navbarIns' : 'navbarStu';
            },
            logo() {
                return this.getUser === 'instructors' ? 'logoIns' : 'logoStu';
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

           return this.getUser === 'students' ? this['auth/tokenGetter'] === '' ? true : false : false;

            },
    ...mapGetters(['getUser', 'auth/tokenGetter'])
  },
  data: () => ({

  }),

    methods: {
        switchToTeacher() {
        this.$store.commit('changeUser', 'instructors')
      },
        test() {
        console.log(this['auth/tokenGetter']);
      }
  }
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
</style>
  