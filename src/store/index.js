import { createStore } from 'vuex';
import authModule from "./modules/authModule/index"
import InstructorModule from './modules/InstructorModule/index'
import CommonModule from './modules/common/commonIndex'

export default createStore({
  state: () => ({
    User: 'students'
  }),

  modules: {
    auth: authModule,
    instructor: InstructorModule,
    common: CommonModule,


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

});