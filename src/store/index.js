import { createStore } from 'vuex';
import authModule from "./modules/authModule/index"
import InstructorModule from './modules/InstructorModule/index';

export default createStore({
  state: () => ({
    User: 'students'
  }),

  modules: {
    auth: authModule,
    instructor: InstructorModule,


  },

  getters: {
    getUser: (state) => state.User
  },

  mutations: {
    changeUser(state, val) {
      state.User = val;
    },

  },

  actions: {
    changeUser(context, User) {
      context.commit('changeUser', User);
    },
  },

})
