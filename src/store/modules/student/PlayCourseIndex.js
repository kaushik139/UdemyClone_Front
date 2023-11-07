import axios from 'axios';

export default {
    namespaced: true,
    state: {
        courseID: localStorage.getItem('CourseID') || '',
        course: {},
        instructor: {},

    },

    getters: {
        getCourse(state) {
            // console.log(';;');
           return state.course;
        },
        getInstructor(state) {
            // console.log(':::');
            console.log(state.instructor);
            return state.instructor;
        },
    },

    mutations: {
        courseIDMutation(state, value) {
            state.courseID = value;
        },
        setPlayerCourseMutation(state, value) {
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
        },

        async instructordetails({ state }, value) {
            if (value) {
                const res = await axios.get(`http://localhost:3000/instructors/${value}`)

                if (res.data) {
                    state.instructor = res.data;
                    // console.log(state.instructor);
                }
                else alert('Not Found!')
            }
        },

        async PostQnA({ state }, value) {
            console.log(value);
            // console.log(state.courseID);
            if (value) {
                const res = await axios.post(`http://localhost:3000/courses/postQnA/${state.courseID}`, value)


            if (res.data === 'Querry Posted!') {
                alert('Querry Posted')
            }
                else alert('Not Posted!')
            }
        }

    }
    
}