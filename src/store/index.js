import { createStore } from 'vuex';
import authModule from "./modules/authModule/index"
import InstructorModule from './modules/InstructorModule/index'
import Student from './modules/student/studentIndex'
import PlayCourse from './modules/student/PlayCourseIndex'
import Search from './modules/search/searchIndex'
import Admin from './modules/admin/adminIndex'


export default createStore({
  state: () => ({
    User: 'students'
  }),

  modules: {
    auth: authModule,
    instructor: InstructorModule,
    student: Student,
    player: PlayCourse,
    search: Search,
    admin: Admin,

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