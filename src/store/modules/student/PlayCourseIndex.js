import axios from 'axios';

export default {
    namespaced: true,
    state: {
        courseID: localStorage.getItem('CourseID') || '',
        course: {},


    },

    getters: {
        getCourses: (state) => state.Courses,
    },

    mutations: {
        courseIDMutation(state, value) {
            // console.log(value);
            state.courseID = value;
        },
        setPlayerCourseMutation(state, value) {
            // console.log(value.item);
            state.course = value.item;
        }
    },

    actions: {
        async courseAction({commit}, value) {
            // console.log(value);

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/${value}`)

                if (res.data) {
                    // console.log(res.data);
                    await commit('courseIDMutation', value);
                    await commit('setPlayerCourseMutation', res.data);
                }
                else console.log(res);
               }catch(err){console.error(err);}
            }
        }
    }
    
}