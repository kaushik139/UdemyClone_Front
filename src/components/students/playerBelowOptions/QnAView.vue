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
              <v-col name="post-creater-name" cols="5" class="m-0 ml-2 p-0 text-left">
                <v-avatar
                  name="avatar-post"
                  data-value="avatar-post"
                  v-if="querry.querry.studentImg"
                  :image="`http://localhost:3000/Images/${querry.querry.studentImg}`"
                ></v-avatar>
                <v-avatar
                  name="no-avatar-post"
                  v-else
                  :image="require('@/assets/account.svg')"
                ></v-avatar>
                {{ toTitleCase(querry.querry.studentName) }}
              </v-col>
              <!-- Reply Button -->
              <v-col cols="6" class="text-purple" align="right">
                <span name="reply-btn">
                  Reply

                  <!-- Reply Dialog -->
                  <v-dialog
                    v-model="dialogArray[index]"
                    activator="parent"
                    width="500"
                    height="auto"
                  >
                    <v-card>
                      <v-card-text>
                        <span name="reply-dialog-text" style="color: purple; font-size: 12px"
                          >Reply as {{ toTitleCase(userName) }},</span
                        >
                        <v-textarea name="reply-text" rows="3" v-model="replyText"></v-textarea>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          append-icon="mdi-send"
                          color="purple"
                          @click="reply(index)"
                          >Reply</v-btn
                        >
                        <v-btn
                          append-icon="mdi-close-circle"
                          color="danger"
                          @click="dialogArray[index] = false"
                          >Close</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </span>
                <!-- delete button, and dialog -->
                <span name="delete-btn" v-if="showDeleteButton(index)" class="mx-2" color="danger"
                  >Delete
                  <!-- delete dialog -->
                  <v-dialog
                    v-model="dialog2Array[index]"
                    activator="parent"
                    width="400"
                    height="auto"
                  >
                    <v-card>
                      <v-card-text>Are You Sure?</v-card-text>
                      <v-card-actions>
                        <v-btn
                          append-icon="mdi-check-circle"
                          color="red"
                          @click="remove(index)"
                          >Yes</v-btn
                        >
                        <v-btn
                          append-icon="mdi-close-circle"
                          color="purple"
                          @click="dialog2Array[index] = false"
                          >No</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </span>

                <!-- edit button, and dialog -->
                <span name="edit-btn" v-if="showDeleteButton(index)" class="mx-0" color="red"
                  >Edit
                  <!-- delete dialog -->
                  <v-dialog
                    v-model="dialog3Array[index]"
                    activator="parent"
                    width="400"
                    height="auto"
                  >
                    <v-card>
                      <v-card-text style="color: purple; font-size: 12px"
                        >Edit QnA Post:</v-card-text
                      >
                      <v-textarea
                        color="purple"
                        rows="2"
                        class="m-2"
                        v-model="querry.querry.text"
                      ></v-textarea>
                      <v-card-actions>
                        <v-btn
                          append-icon="mdi-pencil-outline"
                          color="red"
                          @click="editPost(index, querry.querry.text)"
                          >Edit</v-btn
                        >
                        <v-btn
                          append-icon="mdi-close-circle"
                          color="purple"
                          @click="dialog3Array[index] = false"
                          >Close</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </span>
              </v-col>
            </v-row>
            <!-- <v-divider class="m-0"></v-divider> -->
            <!-- Question -->
            <v-col name="querry-text"
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
            <v-divider class="m-0 p-0"></v-divider>
            <v-col v-if="QNA[index].replies">
              <!-- <h6>
                Replies:
              </h6> -->
              <!-- <v-divider width="70%" style="margin: auto; margin-bottom: 5%;"></v-divider> -->
              <!-- {{ QNA[index].replies }}  -->
              <v-row
                v-for="(reply, index2) in QNA[index].replies"
                :key="index2"
                class="py-1"
              >
                <!-- {{reply}}   -->
                <v-col cols="3" class="m-0 ml-2 py-0 text-left">
                  <v-avatar name="reply-avatar"
                    v-if="reply.profileImage"
                    :image="`http://localhost:3000/Images/${reply.profileImage}`"
                    size="x-small"
                  ></v-avatar>
                  <v-avatar
                    v-else
                    :image="require('@/assets/account.svg')"
                  ></v-avatar>
                  {{ toTitleCase(querry.querry.studentName) }}:
                  <v-row v-if="showReplyBtn(reply.studentID)" class="p-1 m-1">
                    <!-- edit reply -->
                    <v-icon
                      icon="mdi-pencil-outline"
                      color="purple"
                      class="mx-2"
                      @click="showEditReplyDialog(reply.reply, index, index2)"
                    >
                      <!-- @click="editReplyDialog = true; editReply = reply.reply; querryIndex = index; replyIndex = index2" -->
                    </v-icon>
                    <v-icon
                      icon="mdi-delete-outline"
                      color="red"
                      class="mx-2"
                      @click="showDeleteReplyDialog(index, index2)"
                    ></v-icon>
                  </v-row>
                </v-col>
                <v-col
                  class="text-left py-0"
                  style="
                    font-size: 12px;
                    font-family: 'Times New Roman', Times, serif;
                    color: rgb(99, 98, 98);
                  "
                >
                  {{ reply.reply }}
                </v-col>
              </v-row>
            </v-col>
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
        <v-btn append-icon="mdi-send" size="small" color="purple" @click="post"
          >POST</v-btn
        >
      </v-card>
    </v-card>

    <!-- edit reply dialog -->
    <v-dialog
      v-model="editReplyDialog"
      transition="dialog-bottom-transition"
      width="400"
      height="auto"
    >
      <v-card>
        <v-card-text style="color: purple; font-size: 12px">
          Edit Reply
        </v-card-text>
        <v-textarea
          class="m-2"
          rows="2"
          color="purple"
          v-model="editReply"
        ></v-textarea>
        <v-card-actions>
          <v-btn
            append-icon="mdi-pencil-outline"
            color="red"
            @click="editReplyMethod()"
            >Edit</v-btn
          >
          <v-btn
            append-icon="mdi-close-circle"
            color="purple"
            @click="editReplyDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete reply dialog -->
    <v-dialog v-model="deleteReplyDialog" width="400" height="auto">
      <v-card>
        <v-card-text color="purple"> Are You Sure?</v-card-text>
        <v-card-actions>
          <v-btn append-icon="mdi-check-circle" color="red" @click="removeReply"
            >Yes</v-btn
          >
          <v-btn
            append-icon="mdi-close-circle"
            color="purple"
            @click="deleteReplyDialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      return localStorage.getItem("viewType") || "videos";
    },
    id() {
      // console.log(this.$store.state.auth.userData.user._id);
      return this.$store.state.auth.userData.user._id || null;
    },
  },

  data: () => ({
    QNA: [],
    querry: "",
    dialogArray: [],
    dialog2Array: [],
    dialog3Array: [],
    editReplyDialog: false,
    deleteReplyDialog: false,
    editReply: "",
    querryIndex: "",
    replyIndex: "",
    userName: localStorage.getItem("name"),
    replyText: "",
    time: 0,
  }),

  methods: {
    /**
     *
     * @param {*} value
     */
    toTitleCase(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

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
      this.querry = "";
    },

    async editPost(querryIndex, text) {
      // console.log(querryIndex);
      await this.$store.dispatch("player/editQuerry", {
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        querryIndex: querryIndex,
        text: text,
      });

      await this.mount();
      this.dialog3Array[querryIndex] = false;
    },

    async reply(querryIndex) {
      // console.log(querryIndex);
      // console.log(this.replyText);
      // console.log(this.$store.state.auth.userData.user._id);

      if (this.replyText) {
        await this.$store.dispatch("player/replyQNA", {
          studentID: this.$store.state.auth.userData.user._id,
          sectionIndex: this.sectionIndex,
          viewIndex: this.viewIndex,
          viewType: this.viewType,
          querryIndex: querryIndex,
          replyText: this.replyText,
        });
      } else alert("Reply Empty!");

      this.replyText = "";
      this.dialogArray[querryIndex] = false;
      await this.mount();
    },

    openDialog() {
      // console.log(this.dialog);
      if (this.dialog === false) this.dialog = true;
      // console.log(this.dialog);
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

    showReplyBtn(replyID) {
      // console.log(replyID);
      if (replyID === this.id) return true;
      else return false;
    },

    showEditReplyDialog(editReply, querryIndex, replyIndex) {
      this.editReplyDialog = true;
      this.editReply = editReply;
      this.querryIndex = querryIndex;
      this.replyIndex = replyIndex;
    },

    showDeleteReplyDialog(querryIndex, replyIndex) {
      this.deleteReplyDialog = true;
      this.querryIndex = querryIndex;
      this.replyIndex = replyIndex;
    },

    async editReplyMethod() {
      await this.$store.dispatch("player/editQnaReply", {
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        querryIndex: this.querryIndex,
        replyIndex: this.replyIndex,
        editReply: this.editReply,
      });
      await this.mount();
      this.editReplyDialog = false;
    },

    async removeReply() {
      await this.$store.dispatch("player/deleteQnaReply", {
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        querryIndex: this.querryIndex,
        replyIndex: this.replyIndex,
      });
      await this.mount();
      this.deleteReplyDialog = false;
    },

    async remove(querryIndex) {
      // console.log(this.QNA[querryIndex]);
      await this.$store.dispatch("player/removeQuerry", {
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        querryIndex: querryIndex,
      });

      this.dialog2Array[querryIndex] = false;
      await this.mount();
    },

    async mount() {
      console.log(this.time++);
      // console.log([this.viewType]);
      // console.log(this["player/getCourse"].sections[this.sectionIndex][this.viewType][this.viewIndex].QnA);
      if (
        this["player/getCourse"].sections[this.sectionIndex][this.viewType][
          this.viewIndex
        ].QnA.length
      ) {
        await this.$store.dispatch(
          "player/getQNA",
          this["player/getCourse"].sections[this.sectionIndex][this.viewType][
            this.viewIndex
          ].QnA
        );

        if (this["player/getterQNA"]) {
          this.QNA = this["player/getterQNA"];
          // console.log(this.QNA);

          // console.log(this.QNA.length);
          this.dialogArray = Array.from(
            { length: this.QNA.length },
            () => false
          );
          this.dialog2Array = Array.from(
            { length: this.QNA.length },
            () => false
          );
          this.dialog3Array = Array.from(
            { length: this.QNA.length },
            () => false
          );
          // this.dialog4Array = Array.from({ length: this.QNA.length }, () => false);
        }
      } else {
        // console.log("no data");
        this.QNA = [];
      }
    },
  },

  async mounted() {
    // console.log("QNA");
    await this.mount();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>