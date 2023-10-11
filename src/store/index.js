import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    User: 'instructors'
  }),

  getters: {
    getUser: (state) => state.User
  },

  mutations: {
    changeUser(state, val) {
      state.User = val;
    }
  },

  actions: {
    changeUser(context, User) {
      context.commit('changeUser', User);
    },
  },

  modules: {}
})
