<template>
  <div class="contain">
    <!-- main Card -->
    <v-card style="width: 90%; margin: auto" elevation="4" class="my-4">
      <!-- Display Querries -->
      <v-row v-if="QNA.length" class="m-4 p-8">
        <v-card
          v-for="(querry, index) in QNA"
          :key="index"
          style="width: 100vw"
          elevation="0"
        >
          <v-card elevation="3" class="m-2">
            <!-- profile Image -->
            <v-row class="m-1">
              <v-col cols="5" class="m-0 ml-2 p-0 text-left">
                <v-avatar
                  v-if="querry.querry.studentImg"
                  :image="`http://localhost:3000/Images/${querry.querry.studentImg}`"
                ></v-avatar>
                <v-avatar
                  v-else
                  :image="require('@/assets/account.svg')"
                ></v-avatar>
                {{ querry.querry.studentName }}
              </v-col>
              <!-- Reply Button -->
              <v-col cols="6" class="text-purple" align="right">
               <span> Reply

                  <!-- Reply Dialog -->
                  <v-dialog
        v-model="dialogArray[index]"
        activator="parent"
        width="500"
        height="auto"
      >
        <v-card>
          <v-card-text>
            <span style="color: purple; font-size: 12px;">Reply as {{ userName }},</span>
            <v-textarea rows="3" v-model="replyText" color="purple"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn append-icon="mdi-send" color="purple" @click="reply(index)">Reply</v-btn>
            <v-btn append-icon="mdi-close-circle" color="danger" @click="dialogArray[index] = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </span>

      <span v-if="showDeleteButton(index)" class="mx-2" color="red">Delete
      <!-- delete dialog -->
     
        <v-dialog
        v-model="dialog2Array[index]"
        activator="parent"
        width="400"
        height="auto">
        <v-card>
          <v-card-text>Are You Sure?</v-card-text>
          <v-card-actions>
            <v-btn append-icon="mdi-check-circle" color="red" @click="remove(index)">Yes</v-btn>
            <v-btn append-icon="mdi-close-circle" color="purple" @click="dialog2Array[index] = false">No</v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
      </span>

              </v-col>
            </v-row>
            <v-divider class="m-0"></v-divider>
            <!-- Question -->
            <v-col
              class="p-2 text-center"
              style="
                color: rgb(99, 98, 98);
                font-size: 13px;
                font-family: 'Times New Roman', Times, serif;
              "
              >{{ querry.querry.text }}
            </v-col>
            <!-- Question End -->
            <!-- replies -->
            <v-col class="bg-danger"> </v-col>
          </v-card>
          <!-- loop End -->
        </v-card>
      </v-row>
      <!-- in case of no Querry -->
      <v-row v-else class="m-4" style="width: 100vw">
        <v-card style="width: 55%" elevation="0">
          <h4>No Qurries Posted Yet!</h4>
          <span style="font-size: 12px; color: purple">Post One Now!</span>
        </v-card>
      </v-row>
      <!-- Create Qurries -->
      <v-card class="mb-4 p-3" elevation="4" style="width: 90%; margin: auto">
        <h6>New Querry?</h6>
        <!-- <h6>Post a Querry</h6> -->
        <v-textarea
          label="Create a Query"
          rows="2"
          v-model="querry"
          color="purple"
        >
        </v-textarea>
        <v-btn append-icon="mdi-send" color="purple" @click="post">POST</v-btn>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["player/getCourse", "player/getterQNA"]),
    sectionIndex() {
      return localStorage.getItem("section") || 0;
    },
    viewIndex() {
      return localStorage.getItem("viewIndex") || 0;
    },
    viewType() {
      return localStorage.getItem("viewType") || "video";
    },
    id() {
      return this.$store.state.auth.userData.user._id || null;
    },
    
  },

  data: () => ({
    QNA: [],
    querry: "",
    dialogArray: [],
    dialog2Array: [],
    userName: localStorage.getItem('name'),
    replyText: '',

  }),

  methods: {
    async post() {
      if (this.querry !== "") {

        await this.$store.dispatch("player/PostQnA", {
          querry: this.querry,
          sectionIndex: this.sectionIndex,
          viewIndex: this.viewIndex,
          viewType: this.viewType,
          id: this.id,
        });
        await this.mount();
      } else alert("Empty Field!");
    },

    async reply(querryIndex) {
      // console.log(querryIndex);
      // console.log(this.replyText);
      // console.log(this.$store.state.auth.userData.user._id);

      await this.$store.dispatch('player/replyQNA', {
        studentID: this.$store.state.auth.userData.user._id,
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        querryIndex: querryIndex,
        replyText: this.replyText
      })



      this.dialogArray[querryIndex] = false;
    },

    openDialog() {
      console.log(this.dialog);
      if (this.dialog === false) this.dialog = true;
      console.log(this.dialog);
    },

    /**
     * 
     * @param {*} postID 
     */
    showDeleteButton(postID) {
      if (this.QNA[postID].querry.studentID === this.id) return true;
      else return false;
      // console.log(this.QNA[postID].querry.studentID);
    },

    async remove(querryIndex) {
      // console.log(this.QNA[querryIndex]);
      await this.$store.dispatch('player/removeQuerry', {
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        querryIndex: querryIndex,
      });

      this.dialog2Array[querryIndex] = false;
      await this.mount();
    },

    async mount() {
      if (
        this["player/getCourse"].sections[this.sectionIndex][this.viewType][this.viewIndex].QnA) {
        await this.$store.dispatch(
          "player/getQNA",
          this["player/getCourse"].sections[this.sectionIndex][this.viewType][this.viewIndex].QnA);
      }
      if (this["player/getterQNA"]) {
        this.QNA = this["player/getterQNA"];
      }

      // console.log(this.QNA.length);
      this.dialogArray = Array.from({ length: this.QNA.length }, () => false);
      this.dialog2Array = Array.from({ length: this.QNA.length }, () => false);
    },
  },

  async mounted() {
    await this.mount();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>