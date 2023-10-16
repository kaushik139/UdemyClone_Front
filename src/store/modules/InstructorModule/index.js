import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        courseDraft:{
            title: '',
            miniDescription: '',
            instructor: '',
            category: '',
            fullDescription: '',
            price: '',
            rating: '',
            duration: '',
            lectures: '',
            status: '',                
        }

    },


    mutations: {
        planCourse(state, val) {
            
        }

    },


    actions: {
        // stringAction({ commit }, {value}) {
        // console.log(value);
        //     // commit('userDataUpdate', value);
        // },

      

      
    },


    getters: {
        stringGetter(state) {
            // console.log(JSON.parse(localStorage.getItem('TWBstring')))
            // console.log(state.string.newValue)
            return state.string.newValue;
        },
        routeToLoginGetter(state) {
            return state.routeToLogin;
        },
        loginErrorGetter(state) {
            return state.loginError;
        },
        routePathGetter(state) {
            return state.routePath;
        },
        tokenGetter(state) {
            console.log('from getter : ' + state.userData.token);
            return state.userData.token;
        },

    },
}