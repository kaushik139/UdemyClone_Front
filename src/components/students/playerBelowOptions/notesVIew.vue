<template>
  <div class="contain">
    <!-- show Notes -->
    <div v-if="showNotes">
      <v-card
        v-for="(note, index) in Notes"
        :key="index"
        class="mb-4 p-3"
        elevation="4"
        style="width: 90%; margin: auto"
      >
        <!-- Note headder -->
        <v-row>
          <!-- Index -->
          <v-col cols="2" class="">
            <h6>{{ index + 1 }}.</h6>
          </v-col>
          <v-spacer></v-spacer>
          <!-- Controls -->
          <v-col cols="3" class="text-right">
            <v-icon
              class="mx-1"
              icon="mdi-pencil-outline"
              color="purple"
              @click="showEditDialog(note.note, note._id)"
            >
            </v-icon>
            <v-icon
              class="mx-1"
              icon="mdi-delete-outline"
              color="red"
              @click="showRemoveDialog(note._id)"
            ></v-icon>
          </v-col>
        </v-row>
        <!-- Note Content -->
        <p>{{ note.note }}</p>
      </v-card>
    </div>
    <!-- Create NOte -->
    <v-card class="mb-4 p-3" elevation="4" style="width: 90%; margin: auto">
      <v-textarea label="New Note" rows="2" v-model="newNote" color="purple">
      </v-textarea>
      <v-btn append-icon="mdi-send" size="small" color="purple" @click="post"
        >Create Note</v-btn
      >
    </v-card>

    <!-- edit dialog -->
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="450"
      height="auto"
    >
      <v-card>
        <v-card-text style="color: purple; font-size: 12px"
          >Edit Note:</v-card-text
        >
        <v-textarea
          color="purple"
          rows="2"
          class="m-2"
          v-model="editNoteText"
        ></v-textarea>
        <v-card-actions>
          <v-btn append-icon="mdi-pencil-outline" color="red" @click="editNote"
            >Edit</v-btn
          >
          <v-btn
            append-icon="mdi-close-circle"
            color="purple"
            @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->
    <v-dialog
      v-model="dialog2"
      transition="dialog-bottom-transition"
      width="400"
      height="auto"
    >
      <v-card>
        <v-card-text>Are You Sure?</v-card-text>
        <v-card-actions>
          <v-btn
            append-icon="mdi-check-circle"
            color="red"
            @click="removeNote"
            >Yes</v-btn
          >
          <v-btn
            append-icon="mdi-close-circle"
            color="purple"
            @click="dialog2 = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end of Container -->
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["player/NotesGetter"]),
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
    showNotes() {
      return this["player/NotesGetter"].length > 0 ? true : false;
    },
  },

  data: () => ({
    newNote: "",
    Notes: [],
    dialog: false,
    dialog2: false,
    editNoteText: "",
    editnoteID: "",
    deletenoteID: '',

  }),

  methods: {
    async post() {
      if (this.newNote !== "") {
        await this.$store.dispatch("player/CreateNote", {
          id: this.id,
          note: this.newNote,
          sectionIndex: this.sectionIndex,
          viewIndex: this.viewIndex,
          viewType: this.viewType,
        });
      }
      await this.mount();
    },

    showEditDialog(text, noteID) {
      this.editNoteText = text;
      this.editnoteID = noteID;
      this.dialog = true;
    },

    async editNote() {
      await this.$store.dispatch("player/EditNote", {
        id: this.id,
        note: this.editNoteText,
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        noteID: this.editnoteID,
      });
      await this.mount();
      this.dialog = false;
    },

    showRemoveDialog(noteID) {
      this.deletenoteID = noteID;
      this.dialog2 = true;
    },

    async removeNote() {
      await this.$store.dispatch("player/DeleteNote", {
        id: this.id,
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
        noteID: this.deletenoteID,
      });
      await this.mount();
      this.dialog2 = false
    },

    async mount() {
      await this.$store.dispatch("player/GetNotes", {
        id: this.id,
        sectionIndex: this.sectionIndex,
        viewIndex: this.viewIndex,
        viewType: this.viewType,
      });
      if (this["player/NotesGetter"]) {
        console.log(this["player/NotesGetter"]);
        this.Notes = this["player/NotesGetter"];
      }

      this.newNote = "";
    },
  },

  async mounted() {
    await this.mount();
  },
};
</script>