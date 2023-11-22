import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        searchText: '',
        searchResults: [],
        showCourse: {},

    },


    mutations: {
        searchResultsMutation(state, val) {
            state.searchResults = val;
        },
        showCourseMutation(state, val) {
            state.showCourse = val;
        }
       
    },


    actions: {

        // search
        async searchAction({ commit }, value ) {
            // console.log(value);
            // console.log(`${rootState.User}`);

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/search/${value}`,)
               
                    if (res.data.processedResults) {
                        // console.log(res.data.processedResults);
                        commit('searchResultsMutation', res.data.processedResults);
                    }
                }
                catch (err) {
                    console.log(err);
                };
            }

        },

        async showCourseAction({ commit }, value) {
            // console.log(value);

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/${value}`);
                    
                    if (res.data.item) {
                        // console.log(res.data.item);
                        commit('showCourseMutation', res.data.item)
                    }
                }catch(err){console.error(err);}
            }
        },

        
    },


    getters: {
        searchResultsGetter(state) {
            return state.searchResults;
        },
        showCourseGetter(state) {
            return state.showCourse;
        }
       

    },
}