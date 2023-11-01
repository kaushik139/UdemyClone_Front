import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        Courses: []
        

    },

    getters: {
        getCourses: (state) => state.Courses
    },

    mutations: {
        SetCourses(state, value) {
            console.log(value);
            // state.Courses = value;
        }

    },

    actions: {
        async fetchAllCourses({ commit, state }, value) {
            // console.log(value);
            
                try {
                    const res = await axios.get(`http://localhost:3000/students/showAllCourses/${value}`);

                    if (res.data) {
                        state.Courses = res.data;
                    }                    
                }catch(err){alert(err)}
          }
        }

    
}