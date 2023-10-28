import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        Courses: [
            {
                id: '',
                title: '',
                miniDescription: '',
                fullDescritption: '',
                img: '',
                author: '',
                status: '',
            }
        ]
        

    },

    getters: {
        getCourses: (state) => state.Courses
    },

    mutations: {
        SetCourses(state) {
            
        }

    },

    actions: {
        async fetchCourses({ commit }, value) {
            // console.log(value);
            if (value.email) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/showCourses/${value.email}`);

                    
                }catch(err){alert(err)}
          }
        }

    }
}