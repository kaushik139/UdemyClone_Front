import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        token: '',
        userData: {
            name: '',
            email: '',
            token: localStorage.getItem('token') || ''

        },
        routeToLogin: false,
        routeToHome: false,
        loginError: null,
        routePath: null,
        authenticated: false,

    },


    mutations: {
        changeRoute(state, val) {
            state.routeToLogin = val.value;
        },
        setLoginError(state, val) {
            state.loginError = val.value;
        },
        setRoutePath(state, val) {
            console.log('setRoute::: ' + val);
            state.routePath = val;
        },
        setUserData(state, val) {
            state.userData.name = val.name;
            state.userData.email = val.email;
            state.userData.token = val.token;
            console.log('from mutation: ' + val.token);
        },

    },


    actions: {

        // signUp
        async signUp({ commit, rootState }, { value }) {
            console.log(value);
            // console.log(`${rootState.User}`);

            await axios
                .post(`http://localhost:3000/${rootState.User}/newSignup`, {
                    name: value.name,
                    email: value.email,
                    password: value.password,
                })
                .then(() => {
                    console.log(chalk.bgRed.yellowBright("Registered!"));
                    alert("Registration Successful!");
                    // commit('userDataUpdate', value);
                    commit('changeRoute', { value: true });
                })
                .catch((err) => {
                    console.log(err);
                });

        },

        // Login
        async login({ commit, rootState, state }, { value }) {

            try {
                const response = await axios.post(
                    `http://localhost:3000/students/login`,
                    {
                        email: value.email,
                        password: value.password,
                    }
                )
                if (response.data.token) {
                    // console.log(response.data.token);
                    console.log("name: " + response.data.name);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('email', value.email);
                    localStorage.setItem('role', response.data.role);
                    rootState.User = response.data.role;
                    commit('setUserData', { name: response.data.name, email: value.email, token: response.data.token })
                    commit('setRoutePath', `${rootState.User[0]}Home`);
                    // router.push({ name: `${rootState.User[0]}Home` });

                }
            }
            catch (error) {
                console.log(chalk.red(error.response.data.message));
                commit('setLoginError', { value: error.response.data.message });
                // if (error) commit('setLoginError', { value: error });
            }
        }
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
            return state.userData.token;
        },

    },
}