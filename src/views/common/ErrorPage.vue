<template>
    <div class="contain">

        <div class="num">
            404
        </div>
        <div class="text">
            ERROR: Page Not Found!
        </div>
        <button class="btn btn-outline-danger px-1 py-0" @click="home">HOME</button>
        <h6>Redirecting in 5 Secs...</h6>
    </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';
  // import navBar from "./components/navBar.vue";
  
  export default {
    name: "ErrorPage",

      computed: {
        ...mapGetters(['auth/userDataGetter'])
    },
  
    data: () => ({
        email: localStorage.getItem('email') || '',
        role: localStorage.getItem('role') || '',
    }),

      methods: {
            home() {
                // console.log(this['auth/userDataGetter'].user);
                if (this['auth/userDataGetter'].user) {
                      if (this.role === 'students') {
                            this.$router.push('/sHome')                        }
                        else this.$router.push('/iHome')
                  }
                  else this.$router.push('/')
        }
    },
    async mounted() {
        setTimeout(() => {
          localStorage.getItem('token') ? localStorage.getItem('role') === 'students' ? this.$router.push('/sHome') : this.$router.push('/iHome') : '';
          }, 5000)

          if (this.email && this.role) {
            // console.log(this.email, this.role);
            await this.$store.dispatch('auth/refreshUserAction', {email: this.email, role: this.role})
        }

        
    },
  };
  </script>
  
  <style scoped>
  .num{
    color: rgb(187 30 30);
    font-size: 300px;
    margin-bottom: -110px;
    padding-bottom: 0px;
  }
  .text{
    font-weight: 1000;
  }
  .btn{
    font-weight: 700;
    margin-bottom: 78px;
  }
  </style>
  