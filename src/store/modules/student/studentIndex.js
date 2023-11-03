import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        Courses: [],
        MyCourses: [],
        selectedCourse: {},
        selectedAction: '',
        
        

    },

    getters: {
        getCourses: (state) => state.Courses,
        getMyCourses: (state) => state.MyCourses,
        getSelectedCourse: (state) => state.selectedCourse,
        getSelectedAction: (state) => state.selectedAction,

    },

    mutations: {
        // SelectCourse(state, value) {
        //     // console.log(value.action);
        //     if (value) {
                
        //     state.selectedCourse = value.course;
        //     state.selectedAction = value.action;
        //     }
        //     // else 
        // }


    },

    actions: {
        async fetchAllCourses({ commit, state }, value) {
            // console.log(value);
            
            try {
                const res = await axios.get(`http://localhost:3000/students/showAllCourses/${value}`);

                if (res.data) {
                    state.Courses = res.data;
                    // console.log(state.Courses);
                }
            } catch (err) { alert(err) }
        },
    
    
        async getMyCourses({ commit, state }, value) {
            // console.log(value);
        
            try {
                const res = await axios.get(`http://localhost:3000/students/showMyCourses/${value}`);

                if (res.data !== 'No Course Found') {
                    state.MyCourses = res.data;
                    // console.log(state.MyCourses );
                }                    
            }catch(err){alert(err)}
        },
    
    }
    
}