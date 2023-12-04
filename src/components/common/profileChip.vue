<template>
  <!-- user Profile chip -->
  <div v-if="userDetails.name">
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
              v-if="userDetails.profileImage"
              :src="`http://localhost:3000/Images/${userDetails.profileImage}`"
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
              v-if="userDetails.profileImage"
              :image="`http://localhost:3000/Images/${userDetails.profileImage}`"
            ></v-avatar>
            <v-avatar
              v-else
              :image="require('@/assets/account.svg')"
            ></v-avatar>
          </template>

          <v-list-item-title>{{ userDetails.name }}</v-list-item-title>

          <v-list-item-subtitle>{{ userDetails.email }}</v-list-item-subtitle>

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
          <v-card>
            <v-card style="width: 90%; margin: 4%; display: inline;" elevation="0">
              <v-btn
                style="margin-left: 90%"
                elevation="0"
                @click="editDialog = false"
              >
                <v-icon color="red" size="large">mdi-close-circle</v-icon>
              </v-btn>

              <!-- <v-card style="width: 95%; height: 95%; margin: auto"> -->
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

                  <v-btn class="me-4" @click="editProfile"> submit </v-btn>
                  <v-btn @click="clear"> clear </v-btn>
                </form>
                <v-card-actions> </v-card-actions>
              <!-- </v-card> -->
            </v-card>
          </v-card>
          </v-dialog>
        </v-list-item>

       
        <!-- Logout -->
        <v-list-item link prepend-icon="mdi-logout">
          <v-list-item-subtitle>Logout</v-list-item-subtitle>
          <!-- Logout Dialog -->
          <v-dialog
            v-model="logoutDialog"
            activator="parent"
            persistent
            style="text-align: center; width: 40%"
          >
            <v-card class="p-4 rounded-2">
              <h5>Are you sure you want to <span class="text-red">Logout?</span></h5>
              <!-- dialog butons -->
              <v-card-actions>
                <v-col cols="6">
                  <v-btn elevation="2" color="red-darken-2" variant="text" @click="logout" append-icon="mdi-logout">
                    Yes
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                  elevation="2"
                    color="green-darken-2"
                    variant="text"
                    @click="logoutDialog = false"
                    append-icon="mdi-alpha-x-circle-outline"
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
</template>
    
    <script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileChip",
  computed: {
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
    async editProfile() {
// console.log(this.editImage[0]);

      if (this.editName.length > 2) {
       await this.$store.dispatch("auth/editProfileAction", {
          name: this.editName,
          image: this.editImage !== null ? this.editImage[0] : "",
        });
      }
      this.editDialog = false;
      this.editImage = null;
      // await this.mount();
      await this.mount();

    },

    async logout() {
      this.logoutDialog = false;
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
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
      if (this["auth/userDataGetter"]) {
        // console.log(this["auth/userDataGetter"].user.profileImage);
        this.userDetails = this["auth/userDataGetter"].user;
        this.editName = this["auth/userDataGetter"].user.name;
      }
    },
  },

  async mounted() {
    await this.mount();
  },
};
</script>
  
  <style scoped>
form:focus-within {
  box-shadow: 0px 0px 5px 0px rgb(206, 60, 225);
}
</style>
  