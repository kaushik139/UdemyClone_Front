<template>
  <v-card>
    <v-tabs
      v-if="this.sectionArray.length"
      v-model="tab"
      bg-color="red-lighten-3"
    >
      <v-tab
        v-for="(n, index) in sectionArray"
        :key="n"
        :value="n"
        style="color: rgb(131, 0, 0)"
        @click="showSection(index)"
      >
        Section {{ index + 1 }}
      </v-tab>
    </v-tabs>

    <div v-if="!this.sectionArray.length" class="space">
      <h3>Begin with your first Section!</h3>
    </div>

    <!-- Create new Section -->
    <v-btn block class="btn" @click="addSection"> Add New Section </v-btn>

    <!-- Edit section -->
    <v-btn v-if="sectionArray.length" block class="btn" @click="editSection">
      Edit Section {{ selectedSectionIndex }}
    </v-btn>

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

    {{ sectionArray }}

    <!-- section Content -->
    <v-card v-show="showSectionDiv">
      {{ selectedSection }}
      <br />
      <v-label>Section Name: {{ selectedSection.sectionName }}</v-label
      ><br />
      <v-label
        >Section Description: {{ selectedSection.sectionDescription }}</v-label
      >
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    sectionArray: [],
    selectedSection: {},
    selectedSectionIndex: 1,
    showSectionDiv: false,
    // loading: false,
    // timeout: null,
    sectionName: "",
    tab: null,
    showModal: false,
    modalTitle: "",
    modalSectionNo: "",
    formData: {
      sectionName: "",
      sectionDescription: "",
    },
    nameRules: [
      (value) => {
        if (value) return true;
        // console.log("val" + value);
        return "Please enter a name!";
      },
    ],
  }),

  watch: {
    length(val) {
      this.tab = val - 1;
    },
  },

  methods: {
    addSection() {
      this.modalTitle = "Adding";
      this.modalSectionNo = this.sectionArray.length + 1;
      this.showModal = true;
    },

    submitForm() {
      if (this.modalTitle === "Adding") {
        // Add New Section
        if (this.formData.sectionName) {
          console.log("Form data submitted: ", this.formData);

          this.$store.dispatch('instructor/updateSection', this.formData);

          this.sectionArray.push({
            sectionName: this.formData.sectionName,
            sectionDescription: this.formData.sectionDescription,
          });

          this.formData.sectionName = "";
          this.formData.sectionDescription = "";
          this.showModal = false;
        } else alert("Please Enter a Section Name!");
      } else {
        // Edit existing Section
        if (this.formData.sectionName) {
          console.log("Form data submitted:", this.formData);
          this.sectionArray[this.selectedSectionIndex - 1] = {
            sectionName: this.formData.sectionName,
            sectionDescription: this.formData.sectionDescription,
          };

          this.formData.sectionName = "";
          this.formData.sectionDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
      }
    },

    clear() {
      this.formData.sectionName = "";
      this.formData.sectionDescription = "";
    },

    showSection(val) {
      this.showSectionDiv = true;
      this.selectedSection = this.sectionArray[val];
      console.log(this.selectedSection.index);
      this.selectedSectionIndex = val + 1;
    },

    editSection() {
      this.modalTitle = "Editing";
      this.modalSectionNo = this.selectedSectionIndex;
      this.showModal = true;
      this.formData.sectionName = this.selectedSection.sectionName || this.sectionArray[0].sectionName;
      this.formData.sectionDescription =
        this.selectedSection.sectionDescription || this.sectionArray[0].sectionName;
    },
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
</style>