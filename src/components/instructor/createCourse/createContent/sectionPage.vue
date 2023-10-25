<template>
  <v-card>
    <v-tabs
      v-if="this.sectionArray.length"
      v-model="tab"
      bg-color="red-lighten-3"
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tab
        v-for="(n, index) in sectionArray"
        :key="n"
        style="color: rgb(131, 0, 0)"
        @click="showSection(index)"
        >
        <!-- :value="n" -->
        Section {{ index + 1 }}
      </v-tab>
    </v-tabs>

    <div v-if="!this.sectionArray.length" class="space">
      <h3>Begin with your first Section!</h3>
    </div>

    <!-- Create new Section -->
    <v-btn block class="btn" @click="addSection"> Add New Section </v-btn>

    <!-- edit/delete section -->
    <v-row v-if="sectionArray.length">
      <v-col cols="6" style="padding-right: 0px">
        <!-- Edit section -->
        <v-btn block class="btn" @click="editSection">
          Edit Section {{ selectedSectionIndex + 1 }}
        </v-btn>
      </v-col>
      <v-col cols="6" style="padding-left: 0px">
        <!-- Delete section -->
        <v-btn block class="btn" @click="deleteSection">
          Delete Section {{ selectedSectionIndex + 1 }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Edit section
    <v-btn v-if="sectionArray.length" block class="btn" @click="editSection">
      Edit Section {{ selectedSectionIndex }}
    </v-btn> -->

    <!-- Modal dialog -->
    <v-dialog v-model="showModal" max-width="400px">
      <v-card>
        <v-card-title>
          {{ modalTitle }} Section {{ modalSectionNo }}
        </v-card-title>

        <!-- Form inside the modal -->
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.sectionName"
              label="Section Name"
              :rules="nameRules"
            ></v-text-field>
            <v-textarea
              v-model="formData.sectionDescription"
              label="Section Description"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="rgb(131, 0, 0)" @click="submitForm">Submit</v-btn>
          <v-btn color="rgb(200, 100, 100)" @click="clear">Clear</v-btn>
          <v-btn color="rgb(250, 100, 50)" @click="showModal = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- @section Content -->
    <v-card v-show="showSectionDiv">
      <v-row class="dispRow mt-5">
        <v-col cols="5">
          <h5>Section Name:</h5>
        </v-col>
        <v-col cols="7">
          <h5>{{ selectedSection.sectionTitle }}</h5>
        </v-col>
      </v-row>
      <v-row class="dispRow">
        <v-col cols="5">
          <h6>Section Description:</h6>
        </v-col>
        <v-col cols="7">
          <h6>{{ selectedSection.sectionDesctiption?.substr(0, 25) }}</h6>
        </v-col>
      </v-row>
      <v-row class="dispRow mb-0">
        <v-col cols="5">
          <h6>Videos in this Section:</h6>
        </v-col>
        <v-col cols="7">
          <h6>{{ selectedSectionVideos }}</h6>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["instructor/courseDraftGetter"]),
  },

  data: () => ({
    // frontEnd
    sectionArray: [],
    selectedSection: {},
    selectedSectionIndex: 0,
    showSectionDiv: false,
    loading: false,
    timeout: null,
    sectionName: "",
    tab: null,
    showModal: false,
    modalTitle: "",
    modalSectionNo: "",
    nameRules: [
      (value) => {
        if (value) return true;
        return "Please enter a name!";
      },
    ],
    selectedSectionVideos: 0,

    // store
    formData: {
      sectionName: "",
      sectionDescription: "",
    },
  }),

  // watch: {
  //   sectionArray(val) {
  //     this.tab = val+1;
  //   },
  // },

  methods: {
    addSection() {
      this.modalTitle = "Adding";
      this.modalSectionNo = this.sectionArray.length + 1;
      this.showModal = true;
    },

    async submitForm() {
      if (this.modalTitle === "Adding") {
        // Add New Section
        if (this.formData.sectionName && this.formData.sectionDescription) {
          //sending data to store
          await this.$store.dispatch("instructor/CreateSection", this.formData);

          this.formData.sectionName = "";
          this.formData.sectionDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
        // console.log(this.sectionArray.length);
        await this.mount(this.sectionArray.length + 1);
      } else {
        // Edit existing Section
        if (this.formData.sectionName && this.formData.sectionDescription) {
          await this.$store.dispatch("instructor/UpdateSection", {
            form: this.formData,
            index: this.selectedSectionIndex,
          });

          this.formData.sectionName = "";
          this.formData.sectionDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");

        await this.mount(this.selectedSectionIndex);
      }
    },

    clear() {
      this.formData.sectionName = "";
      this.formData.sectionDescription = "";
    },

    //displays current section in @section Content
    showSection(val) {
      this.showSectionDiv = true;
      this.selectedSection = this.sectionArray[val];
      this.selectedSectionIndex = val;
      // this.tab = val > 0 ? val : 0;
      // console.log(this.tab);
    },

    editSection() {
      this.modalTitle = "Editing";
      this.modalSectionNo = this.selectedSectionIndex + 1;
      this.showModal = true;
      this.formData.sectionName = this.selectedSection.sectionTitle;
      this.formData.sectionDescription =
        this.selectedSection.sectionDesctiption;
    },

    async deleteSection() {
      console.log(this.selectedSectionIndex);
      await this.$store.dispatch(
        "instructor/DeleteSection",
        this.selectedSectionIndex
      );
      // if (this.sectionArray.length > this.selectedSectionIndex)
      //   this.selectedSectionIndex++;
      // else this.selectedSectionIndex--;
      await this.mount(this.selectedSectionIndex - 1);
    },

    async mount(v) {
      // console.log(v);
      await this.$store.dispatch(
        "instructor/getDraftCourse",
        localStorage.getItem("courseDraft")
      );

      if (this["instructor/courseDraftGetter"].sectionsArray) {
        this.sectionArray = this["instructor/courseDraftGetter"].sectionsArray;
        if (this.sectionArray.length)
          // await this.showSection(v);
          v > 0 ? this.showSection(v - 1) : this.showSection(0);
      } else {
        this.selectedSection = {};
        this.selectedSectionIndex = 0;
        this.showSectionDiv = false;
      }
      // console.log(this.sectionArray);
    },
  },

  mounted() {
    this.mount(0);
  },
};
</script>


<style scoped>
.form1 {
  margin: 5%;
}

.btn {
  background-color: rgb(248, 123, 123);
}
.btn:hover {
  color: white;
  background-color: rgb(131, 0, 0);
}

.space {
  margin: 120px;
}

h4,
h5 {
  color: (131, 0, 0);
}

.dispRow {
  margin: -25px;
}
::v-deep .v-icon.mdi-arrow-right-bold-box-outline, ::v-deep .v-icon.mdi-arrow-left-bold-box-outline {
  color: rgb(131,0,0);
}</style>