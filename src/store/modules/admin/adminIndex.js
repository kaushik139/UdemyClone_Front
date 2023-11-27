import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        overview: {},
        navTitle:'',
        //////////////////////////////////////////////
        searchText: '',
        searchResults: [],
        Course: {},
        instructor: '',
////////////////////////////////////
        publishedCourses: [],
        unPublishedCourses: [],
        allCourses: [],
        InstructorList: [],
        StudentList: [],
        


    },


    mutations: {
        overviewMutation(state, val) {
            state.overview = val
        },

        navTitleMutation(state, val) {
            state.navTitle = val;
        },
        /////////////////////////////////////////////
        searchResultsMutation(state, val) {
            state.searchResults = val;
        },
        getCourseMutation(state, val) {
            state.Course = val;
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
        // /////////////////////////////////////OVERVIEW/////////////////////////////////////
        async overviewAction({ commit }) {
            try {
                const res = await axios.get('http://localhost:3000/admin/overview');

                if (res.data) {
                    // console.log(res.data);
                    commit('overviewMutation', res.data);
                }
            }catch(err){console.error(err);}
        },

        async publishCourse({ dispatch }) {
            const id = localStorage.getItem('CourseID');
            if (id) {
                try {
                    const res = await axios.post(`http://localhost:3000/admin/publishCourse/${id}`);

                    if (res.data) {
                        console.log(res.data);
                    }
                }catch(err){console.error(err);}
            }
        },

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

        async getCourseAction({ commit }, value) {
            // console.log(value);

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/${value}`);
                    
                    if (res.data.item) {
                        // console.log(res.data.item);
                        commit('getCourseMutation', res.data.item)
                    }
                }catch(err){console.error(err);}
            }
        },

        async instructordetails({ state }, value) {
            // console.error('qqq');
            if (value) {
                const res = await axios.get(`http://localhost:3000/instructors/${value}`)

                if (res.data) {
                    state.instructor = res.data;
                    // console.log(state.instructor);
                }
                else alert('Not Found!')
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
            // console.log('pc');
            try {
                const res = await axios.get('http://localhost:3000/admin/getPcInstructors');

            if (res.data) {
                // console.log(res.data);
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
            // console.log('All');
            try {
                const res = await axios.get('http://localhost:3000/admin/getAllInstructors');

            if (res.data) {
                // console.log(res.data);
                commit('InstructorListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        //////////////////////////Students////////////////////////////////////
        async pcStudentsAction({ commit }) {
            // console.log('pc');
            try {
                const res = await axios.get('http://localhost:3000/admin/getPcStudents');

            if (res.data) {
                // console.log(res.data);
                commit('StudentsListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async upcStudentsAction({ commit }) {
            // console.log('UPC');
            try {
                const res = await axios.get('http://localhost:3000/admin/getUpcStudents');

            if (res.data) {
                // console.log(res.data);
                commit('StudentsListMutation', res.data)
            }
           }catch(err){console.error(err);}
        },
        async allStudentsAction({ commit }) {
            // console.log('All');
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
        overviewGetter(state) {
            return state.overview;
        },

        navTitleGetter(state) {
            return state.navTitle;
        },
        //////////////////////////////////////////////////////
        searchResultsGetter(state) {
            return state.searchResults;
        },
        CourseGetter(state) {
            return state.Course;
        },
        getInstructor(state) {
            return state.instructor;
        },
        //////////////////////////////////////////////////////
        publishedCoursesGetter(state) {
            return state.publishedCourses;
        },
        InstructorListGetter(state) {
            return state.InstructorList;
        },
        StudentsListGetter(state) {
            return state.StudentsList;
        },
       
       

    },
}