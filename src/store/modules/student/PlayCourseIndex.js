import axios from 'axios';

export default {
    namespaced: true,
    state: {
        courseID: localStorage.getItem('CourseID') || '',
        course: {},
        instructor: {},
        QNA: [],

    },

    getters: {
        getCourse(state) {
            // console.log(';;');
           return state.course;
        },
        getInstructor(state) {
            // console.log(':::');
            // console.log(state.instructor);
            return state.instructor;
        },
        getterQNA(state) {
            return state.QNA;
        }
    },

    mutations: {
        courseIDMutation(state, value) {
            state.courseID = value;
        },
        setPlayerCourseMutation(state, value) {
            state.course = value.item;
        },
        setQNA(state, value) {
            state.QNA = value;
        },

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

        async PostQnA({ dispatch, state }, value) {
            console.log(value);
            // console.log(state.courseID);
            if (value) {
                const res = await axios.post(`http://localhost:3000/courses/postQnA/${state.courseID}`, value)


            if (res.data === 'Querry Posted!') {
                alert('Querry Posted');
                await dispatch('coursePlayAction');
                await dispatch('getQNA');
            }
                else alert('Not Posted!')
            }
        },

        async getQNA({ commit }, value) {
            // console.log(value);

            if (value) {
                try {
                    const res = await axios.post('http://localhost:3000/courses/getQNA', value);

                    if (res.data) {

                        console.log(res.data);
                        commit('setQNA', res.data);
                    }
                    else commit('setQNA', [])
                    
                }catch(err){console.error(err);}
                
            }
        },

        async editQuerry({ dispatch, state }, value) {
            console.log(value);

            if (value) {
                try {
                    const res = await axios.post(`http://localhost:3000/courses/editQNA/${state.courseID}`, value);

                    if (res.data === 'Post Updated') {
                        // console.log(res.data);
                      await dispatch('coursePlayAction')
                    }

                }catch(err){console.error(err);}
            }
        },

        async removeQuerry({ dispatch,state }, value) {
            // console.log(value);
            // console.log(state.QNA);
            if (state.QNA.length === 1) state.QNA = [];

            if (value) {
                try {
                    const res = await axios.delete(`http://localhost:3000/courses/removeQNA/${state.courseID}`, {data: value})

                    if (res.data) {
                        // console.log(res.data);
                        alert(res.data);
                        await dispatch('coursePlayAction');
                    }
                }catch(err){console.error(err);}
            }
        },

        async replyQNA({ state }, value) {
            // console.log(value);

            if (value) {
                try {
                    const res = await axios.post(`http://localhost:3000/courses/replyQNA/${state.courseID}`, value);

                    if (res.data) {
                        alert(res.data)
                        await dispatch('getQNA');
                    }
                }catch(err){alert(err)}
            }
        },

        async editQnaReply({ dispatch, state }, value) {
            // console.log(value);
            
            if (value) {
                try {
                    const res = await axios.post(`http://localhost:3000/courses/editQnaReply/${state.courseID}`, value);

                    if (res.data === 'Reply Updated') {
                        alert(res.data)
                        await dispatch('getQNA');
                        await dispatch('coursePlayAction');
                    }
                }catch(err){console.error(err);}
            }
        },

        async deleteQnaReply({ dispatch, state }, value) {
            console.log(value);
            
            if (value) {
                try {
                    const res = await axios.post(`http://localhost:3000/courses/deleteQnaReply/${state.courseID}`, value);

                    if (res.data === 'Reply Deleted') {
                        alert(res.data)
                        await dispatch('getQNA');
                        await dispatch('coursePlayAction');
                    }
                }catch(err){console.error(err);}
            }
        },

    }
    
}