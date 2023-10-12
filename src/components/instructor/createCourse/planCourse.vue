<template>
  <form @submit.prevent="submit">
    <v-text-field label="Course Name" v-model="planData.name"></v-text-field>

    <v-textarea label="Mini Description" v-model="planData.miniDesc"></v-textarea>

    <v-select :items="items1" label="Category" v-model="planData.category"></v-select>

    <v-btn class="me-4" type="submit"> submit </v-btn>

    <v-btn @click="handleReset"> clear </v-btn>

  </form>

</template>


  <script >
export default {
  name: "PlanCourse",

  data: () => ({
      items1: ['Category A', 'Category B', 'Category C'],
        planData: {
            name: '',
      miniDesc: '',
      category: ''
      }
      }),

      methods: {
            submit() {
                console.log(this.planData);
                alert('Course Planning Completed!')
                this.$emit('changeComp', 'LandingPage')
            },
            handleReset() {
                this.planData.name = '';
                this.planData.miniDesc = '';
                this.planData.category   = '';

            }
      }
};
</script>