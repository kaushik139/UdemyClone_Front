import axios from 'axios';

export default {
    namespaced: true,
    state: {
        courseID: localStorage.getItem('CourseID') || '',
        course: {},


    },

    getters: {
        getCourse: (state) => state.course,
        getCourseTitle: (state) => state.course.title,
        
    },

    mutations: {
        courseIDMutation(state, value) {
            // console.log(value);
            state.courseID = value;
        },
        setPlayerCourseMutation(state, value) {
            // console.log(value.item);
            // console.log(state.course);
            state.course = value.item;
        }
    },

    actions: {
        async coursePlayAction({commit, state}) {
            const value = state.courseID;

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/${value}`)

                if (res.data) {
                    // console.log(res.data);
                    // await commit('courseIDMutation', value);
                    await commit('setPlayerCourseMutation', res.data);
                }
                else console.log(res);
               }catch(err){console.error(err);}
            }
        }
    }
    
}