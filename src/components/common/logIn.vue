<template>
  <div class="container1">
    <v-card
      class="mx-auto pa-12 pb-8"
      max-width="448"
      rounded="lg"
      :class="[contain]"
    >
      <!-- elevation="8" -->
      <h3 class="headdingPurple">
        Login<span :style="{ color: symbol }">!</span>
      </h3>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <!-- <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        > -->
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
      ></v-text-field>

      <!-- <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card> -->

      <v-btn block type="submit" :class="[bttn]" @click="login"> Log In </v-btn>

      <v-card-text class="text-center">
        Not a user?
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          <router-link to="/auth/s">Sign up now</router-link>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
        <br>
        <span class="errMsg" v-show="errMessageVisible">{{ errMessage }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>


  <script>
import { mapGetters } from "vuex";
import chalk from "chalk";

export default {
  computed: {
    contain() {
      return this.getUser === "instructors" ? "containIns" : "containStu";
      // return localStorage.getItem('role') === "instructors" ? "containIns" : "containStu";
    },
    bttn() {
      return this.getUser === "instructors" ? "bttnIns" : "bttnStu";
      // return localStorage.getItem('role') === "instructors" ? "bttnIns" : "bttnStu";
    },
    symbol() {
      return this.getUser === "instructors" ? "rgb(131, 0, 0)" : "purple";
      // return localStorage.getItem('role') === "instructors" ? "rgb(131, 0, 0)" : "purple";
          },
          userInitial() {
        return this.getUser[0]
    },
    ...mapGetters(["getUser", 'auth/loginErrorGetter', 'auth/routePathGetter']),
  },
  data: () => ({
        visible: false,
        email: '',
        password: '',
        errMessage: '',
      errMessageVisible: false,
      adminData: {
          email: 'admin@a.com',
          password: 'qqqqq111'
        }
  }),

  methods: {
    async login() {
            // console.log(chalk.red("login triggered:->"));
        if (this.email && this.password) {
            if (this.email === this.adminData.email && this.password === this.adminData.password) {
              localStorage.setItem('role', 'admin');
              this.$router.push('adminHome');
          }
              else {
                const info = {
            email: this.email,
            password: this.password
          }
          await this.$store.dispatch('auth/login', { value: info });
          this.showError(this["auth/loginErrorGetter"]);

          if (this["auth/routePathGetter"] !== null) {
                console.log("from .vue::::: " + this['auth/routePathGetter']);
              this.$router.push(`/${this["auth/routePathGetter"]}`);
            }


           
                // try {
                //     const response = await axios.post(
                //         `http://localhost:3000/${this.getUser}/login`,
                //         {
                //             email: this.email,
                //             password: this.password,
                //         }
                //     )
                //     if (response.data.token) {
                //         localStorage.setItem('token', response.data.token);
                //         localStorage.setItem('email', this.email);
                //         this.$router.push(`/${this.userInitial}home`);
                //     }
                // }
                // catch (error) {
                //     this.showError(error.response.data.message);
                //     console.log(chalk.red(error.response.data.message));
            // }
      
            }
            }
            else this.showError('All fields required!');
        },

      showError(val) {
            this.errMessage = val;
          this.errMessageVisible = true;
              setTimeout(() => {
                  this.errMessageVisible = false;
              }, 2500);
    }
  },
};
</script>

  <style scoped>
.containStu {
  padding: 30px 50px;
  border-radius: 10px;
  /* min-width: 50%; */
  /* min-height: 420px; */
  box-shadow: 3px 3px 8px -3px purple;
}
.containIns {
  padding: 30px 50px;
  border-radius: 10px;
  box-shadow: 3px 3px 8px -3px rgb(131, 0, 0);
}

.bttnStu {
  background: rgb(247, 160, 247);
  box-shadow: 3px 3px 10px -3px purple;
}
.bttnStu:hover {
  color: white;
  background: purple;
}

.bttnIns {
  background: rgb(255, 205, 205);
  box-shadow: 3px 3px 7px 0.1px rgb(131, 0, 0);
}
.bttnIns:hover {
  color: white;
  background: rgb(131, 0, 0);
}

.errMsg{
    color: red;
    font-size: 15px;
}

.container1{
  margin-bottom: 70px;
}
</style>