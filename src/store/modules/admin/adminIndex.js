import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        navTitle:'',
        //////////////////////////////////////////////
        searchText: '',
        searchResults: [],
        showCourse: {},
////////////////////////////////////
        publishedCourses: [],
        unPublishedCourses: [],
        allCourses: [],
        InstructorList: [],
        StudentList: [],
        


    },


    mutations: {
        navTitleMutation(state, val) {
            state.navTitle = val;
        },
        /////////////////////////////////////////////
        searchResultsMutation(state, val) {
            state.searchResults = val;
        },
        showCourseMutation(state, val) {
            state.showCourse = val;
        },
///////////////////////////////////////////////////
        publishedCoursesMutation(state, val) {
            state.publishedCourses = val;
        },

        unPublishedCoursesMutation(state, val) {
            state.unPublishedCourses = val;

        },

        allCoursesMutation(state, val) {
            state.allCourses = val;
        },
 
        InstructorListMutation(state, val) {
            state.InstructorList = val;
        },

        StudentsListMutation(state, val) {
            state.StudentList = val;
            // console.log(val);
            // console.log(state.StudentList);
        },
        
       
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
        ///////////////////////////Courses//////////////////////////////////////
        async publishedCoursesAction({ commit }) {
            // console.log('publishedCoursesAction');
            try {
                const res = await axios.get('http://localhost:3000/admin/getPublishedCourses');

            if (res.data) {
                // console.log(res.data);
                commit('publishedCoursesMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async unPublishedCoursesAction({ commit }) {
            // console.log('unPublishedCoursesAction');
            try {
                const res = await axios.get('http://localhost:3000/admin/getUnpublishedCourses');

            if (res.data) {
                // console.log(res.data);
                commit('publishedCoursesMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async allCoursesAction({ commit }) {
            // console.log('allCoursesAction');
            try {
                const res = await axios.get('http://localhost:3000/admin/getAllCourses');

            if (res.data) {
                // console.log(res.data);
                commit('publishedCoursesMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        ////////////////////////////Instructors/////////////////////////////////
        async pcInstructorsAction({ commit }) {
            console.log('pc');
            try {
                const res = await axios.get('http://localhost:3000/admin/getPcInstructors');

            if (res.data) {
                console.log(res.data);
                commit('InstructorListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async upcInstructorsAction({ commit }) {
            // console.log('UPC');
            try {
                const res = await axios.get('http://localhost:3000/admin/getUpcInstructors');

            if (res.data) {
                // console.log(res.data);
                commit('InstructorListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async allInstructorsAction({ commit }) {
            console.log('All');
            try {
                const res = await axios.get('http://localhost:3000/admin/getAllInstructors');

            if (res.data) {
                console.log(res.data);
                commit('InstructorListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        //////////////////////////Students////////////////////////////////////
        async pcStudentsAction({ commit }) {
            console.log('pc');
            try {
                const res = await axios.get('http://localhost:3000/admin/getPcStudents');

            if (res.data) {
                // console.log(res.data);
                commit('StudentsListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async upcStudentsAction({ commit }) {
            console.log('UPC');
            try {
                const res = await axios.get('http://localhost:3000/admin/getUpcStudents');

            if (res.data) {
                // console.log(res.data);
                commit('StudentsListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async allStudentsAction({ commit }) {
            console.log('All');
            try {
                const res = await axios.get('http://localhost:3000/admin/getAllStudents');

            if (res.data) {
                // console.log(res.data);
                commit('StudentsListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },

        async logout({ state }) {
            state.navTitle = ''
            state.publishedCourses = []
            state.InstructorList = []
            state.StudentList = []
            localStorage.clear();
        }
    },


    getters: {
        navTitleGetter(state) {
            return state.navTitle;
        },
        //////////////////////////////////////////////////////
        searchResultsGetter(state) {
            return state.searchResults;
        },
        showCourseGetter(state) {
            return state.showCourse;
        },
        //////////////////////////////////////////////////////
        publishedCoursesGetter(state) {
            return state.publishedCourses;
        },
        InstructorListGetter(state) {
            return state.InstructorList;
        },
        StudentsListGetterqq(state) {
            console.log(';;');
            console.log(state.StudentsList);
            return state.StudentsList;
        },
       
       

    },
}