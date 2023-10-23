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

    <!-- edit/delete section -->
    <v-row v-if="sectionArray.length">
      <v-col cols="6" style="padding-right: 0px;">
         <!-- Edit section -->
    <v-btn block class="btn" @click="editSection">
      Edit Section {{ selectedSectionIndex }}
    </v-btn>
      </v-col>
      <v-col cols="6" style="padding-left: 0px;">
       <!-- Delete section -->
    <v-btn block class="btn" @click="deleteSection">
      Delete Section {{ selectedSectionIndex }}
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
      <v-row class="dispRow mt-5" >
        <v-col cols="5" >
          <h5 >Section Name: </h5>
        </v-col>
        <v-col cols="7">
         <h5>{{ selectedSection.sectionTitle }}</h5>
        </v-col>
      </v-row>
      <v-row class="dispRow">
        <v-col cols="5" >
          <h6 >Section Description: </h6>
        </v-col>
        <v-col cols="7">
         <h6>{{ selectedSection.sectionDesctiption?.substr(0,25) }}</h6>
        </v-col>
      </v-row>
      <v-row class="dispRow mb-0">
        <v-col cols="5" >
          <h6>Videos in this Section: </h6>
        </v-col>
        <v-col cols="7">
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
    selectedSectionVideos: 0,
    
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

    async submitForm() {
      if (this.modalTitle === "Adding") {
        // Add New Section
        if (this.formData.sectionName && this.formData.sectionDescription) {
          // console.log("Form data submitted: ", this.formData);
          //sending data to store
          await this.$store.dispatch('instructor/CreateSection', this.formData);

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
          // console.log("Form data submitted:", this.formData);

          await this.$store.dispatch('instructor/UpdateSection', {form: this.formData, index: this.selectedSectionIndex-1});
          // console.log(this.selectedSectionIndex-1);

          this.formData.sectionName = "";
          this.formData.sectionDescription = "";
          this.showModal = false;
        } else alert("Please Fill Form Completely!");
      }
      await this.mount(this.selectedSectionIndex - 1);
    },

    clear() {
      this.formData.sectionName = "";
      this.formData.sectionDescription = "";
    },

    //displays current section in @section Content
    showSection(val) {
      this.showSectionDiv = true;
      this.selectedSection = this.sectionArray[val];
      // console.log(this.selectedSection);
      this.selectedSectionIndex = val + 1;
      this.selectedSectionVideos = this.selectedSection.videos.length;
      // console.log(this.selectedSection.videos.length);
    },

    editSection() {
      this.modalTitle = "Editing";
      this.modalSectionNo = this.selectedSectionIndex;
      this.showModal = true;
      this.formData.sectionName = this.selectedSection.sectionTitle;
      this.formData.sectionDescription = this.selectedSection.sectionDesctiption;
    },

    async deleteSection() {
      // console.log(this.selectedSectionIndex - 1);
      await this.$store.dispatch("instructor/DeleteSection", (this.selectedSectionIndex - 1));
      if (this.sectionArray.length > this.selectedSectionIndex ) this.selectedSectionIndex++;
      else this.selectedSectionIndex--;
      await this.mount(this.selectedSectionIndex - 1);
    },


    async mount(v) {
      await this.$store.dispatch('instructor/getDraftCourse', localStorage.getItem('courseDraft'));
        if (this['instructor/courseDraftGetter'].sectionsArray) {
        // console.log(this['instructor/courseDraftGetter'].sectionsArray);
        // console.log(this['instructor/courseDraftGetter'].sectionsArray[0]);
        // console.log(this['instructor/courseDraftGetter'].sectionsArray[0].sectionTitle);
          this.sectionArray = this['instructor/courseDraftGetter'].sectionsArray
          if (this.sectionArray.length) this.showSection(v);
          else {
            this.selectedSection = {};
            this.selectedSectionIndex = 1;
            this.showSectionDiv = false;
          }
        // console.log(this.sectionArray);
      }
    }
  },

  mounted() {
    // if (this['instructor/courseDraftGetter'].sectionsArray) {
    //   // console.log(this['instructor/courseDraftGetter'].sectionsArray);
    //   // console.log(this['instructor/courseDraftGetter'].sectionsArray[0]);
    //   // console.log(this['instructor/courseDraftGetter'].sectionsArray[0].sectionTitle);
    //   this.sectionArray = this['instructor/courseDraftGetter'].sectionsArray
    //   // console.log(this.sectionArray);
    //   this.showSection(0);
    // }
    this.mount(0);

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

.dispRow{
  margin: -25px;
}
</style>