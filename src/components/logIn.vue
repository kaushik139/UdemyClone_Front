<template>
  <div class="container">
    <v-card
      class="mx-auto pa-12 pb-8"
      max-width="448"
      rounded="lg"
      :class="[contain]"
    >
      <!-- elevation="8" -->
      <h3 class="headdingPurple">Login<span :style="{color: symbol}">!</span></h3>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
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
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          <router-link to="/auth/s">Sign up now</router-link>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>


  <script>
import { mapGetters } from "vuex";
import chalk from 'chalk';

export default {
  computed: {
    contain() {
      return this.getUser === "instructors" ? "containIns" : "containStu";
    },
    bttn() {
      return this.getUser === "instructors" ? "bttnIns" : "bttnStu";
    },
    symbol() {
      return this.getUser === "instructors" ? "rgb(131, 0, 0)" : "purple";
    },
    ...mapGetters(["getUser"]),
  },
  data: () => ({
    visible: false,
      }),

      methods: {
            login() {
            console.log(chalk.red('login'));
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
</style>