<template>
  <v-sheet
    width="500"
    class="mx-auto p-3"
    style="text-align: center; margin-top: -30px"
  >
    <v-form fast-fail @submit.prevent>
      <div :class="[contain]">
        <h3 class="headdingPurple">
          Register Now
          <span v-if="this.getUser === 'instructors'">as Teacher</span>
          <span :style="{ color: symbol }">!</span>
        </h3>

        <v-text-field
          v-model="name"
          label="Name"
          :rules="[nameRules.min, nameRules.valid]"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRule"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.valid]"
          :type="show ? 'text' : 'password'"
          label="Password"
          hint="At least 8 characters, one letter and one number"
          @click:append="show = !show"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2" :class="[bttn]" @click="submit"
          >Submit</v-btn
        >
        <v-btn block class="mt-2" :class="[bttn]" @click="clearForm"
          >Clear</v-btn
        >

        <br />
        <p>
          Already registered?
          <a href="#"
            ><router-link to="/auth/l" class="nav-link">Login ></router-link></a
          >
        </p>

        <!-- <p>theme: {{ getUser }}</p> -->
      </div>
    </v-form>
  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SignUp",
  props: {
    // loader: String
  },
  computed: {
    bttn() {
      return this.getUser === "instructors" ? "bttnIns" : "bttnStu";
    },
    contain() {
      return this.getUser === "instructors" ? "containIns" : "containStu";
    },
    symbol() {
      return this.getUser === "instructors" ? "rgb(131, 0, 0)" : "purple";
    },

    ...mapGetters(["getUser", 'auth/routeToLoginGetter']),
  },

  data: () => ({
    name: "",
    nameRules: {
      min: (v) => v.length >= 2 || "Min 3 characters",
      valid: (v) => !/\d/.test(v) || "Name can not contain digits",
    },

    email: "",
    emailRule: [
      (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
          return true;

        return "E-mail not valid!";
      },
    ],

    show: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      valid: (v) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ||
        "Password must contain minimum eight characters, at least one letter and one number.",
    },
  }),

  methods: {
    async submit() {
      if (
        !/\d/.test(name) &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) &&
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)
      ) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

       await this.$store.dispatch("auth/signUp", { value: user });
        if (this["auth/routeToLoginGetter"] === true) await this.$router.push('/auth/l');
            
        // console.log(chalk.red.bgYellowBright(`http://localhost:3000/${this.getUser}/newSignup`));
        // await axios
        //   .post(`http://localhost:3000/${this.getUser}/newSignup`, {
        //     name: this.name,
        //     email: this.email,
        //     password: this.password,
        //   })
        //   .then(() => {
        //     console.log(chalk.bgRed.yellowBright("Registered!"));
        //     alert("Registration Successful!");
        //     this.$router.push("/auth/l");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

      } else {
        alert("Bad Request! Try again");
      }
    },

    clearForm() {
      (this.name = ""), (this.email = ""), (this.password = "");
    },
  },
};
</script>

<style scoped>
.containStu {
  padding: 30px 50px;
  border-radius: 10px;
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