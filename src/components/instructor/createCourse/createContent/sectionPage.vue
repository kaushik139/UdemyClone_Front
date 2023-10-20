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

    <!-- {{ sectionArray }} -->

    <!-- section Content -->
    <v-card v-show="showSectionDiv">
      <v-row >
        <v-col cols="5" >
          <h5 >Section Name: </h5>
          <h6 >Section Description: </h6>
          <h6>Videos in this Section: </h6>
        </v-col>
        <v-col cols="4">
         <h5>{{ selectedSection.sectionTitle }}</h5>
         <h6>{{ selectedSection.sectionDesctiption }}</h6>
         <h6>{{ selectedSectionVideos }}</h6>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(["instructor/courseDraftGetter"]),
    
  },

  data: () => ({
    // frontEnd
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
    nameRules: [
      (value) => {
        if (value) return true;
        return "Please enter a name!";
      },
    ],
    selectedSectionVideos: '',
    
    // backEnd
    formData: {
      sectionName: "",
      sectionDescription: "",
    },
    
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
        if (this.formData.sectionName && this.formData.sectionDescription) {
          // console.log("Form data submitted: ", this.formData);
          //sending data to store
          this.$store.dispatch('instructor/updateSection', this.formData);

          // this.sectionArray.push({
          //   sectionName: this.formData.sectionName,
          //   sectionDescription: this.formData.sectionDescription,
          // });

          this.formData.sectionName = "";
          this.formData.sectionDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
      } else {
        // Edit existing Section
        if (this.formData.sectionName && this.formData.sectionDescription) {
          console.log("Form data submitted:", this.formData);

          this.$store.dispatch('instructor/updateSection', this.formData);


          // this.sectionArray[this.selectedSectionIndex - 1] = {
          //   sectionName: this.formData.sectionName,
          //   sectionDescription: this.formData.sectionDescription,
          // };

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
      // console.log(this.selectedSection.index);
      this.selectedSectionIndex = val + 1;
      this.selectedSectionVideos = this.selectedSection.videos.length;
    },

    editSection() {
      this.modalTitle = "Editing";
      this.modalSectionNo = this.selectedSectionIndex;
      this.showModal = true;
      this.formData.sectionName = this.selectedSection.sectionTitle || this.sectionArray[0].sectionTitle;
      this.formData.sectionDescription =
        this.selectedSection.sectionDesctiption || this.sectionArray[0].sectionDesctiption;
    },
  },

  mounted() {
    if (this['instructor/courseDraftGetter'].sectionsArray) {
      console.log(this['instructor/courseDraftGetter'].sectionsArray[0]);
      this.sectionArray = this['instructor/courseDraftGetter'].sectionsArray
    }
    this.showSection(0);

  }
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

h4, h5{
  color: (131,0,0);
}
</style>