import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
        userData: {},

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
            // console.log('setRoute::: ' + val);
            state.routePath = val;
        },
        setUserData(state, val) {
            // console.log(val);
            state.userData = val.userData
            // console.log('from mutation: ' + val.token);
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
            console.log(value);

            try {
                const res = await axios.post(
                    `http://localhost:3000/students/login`,
                    {
                        email: value.email,
                        password: value.password,
                    }
                )
                if (res.data.token) {
                    // console.log(res.data.token);
                    console.log("name: " + res.data.name);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('email', value.email);
                    localStorage.setItem('role', res.data.role);
                    rootState.User = res.data.role;
                    commit('setUserData', { userData: res.data, token: res.data.token })
                    commit('setRoutePath', `${rootState.User[0]}Home`);
                    // router.push({ name: `${rootState.User[0]}Home` });

                }
            }
            catch (error) {
                console.log(chalk.red(error.res.data.message));
                commit('setLoginError', { value: error.res.data.message });
                // if (error) commit('setLoginError', { value: error });
            }
        },

        async refreshUserAction({ commit, state }, value) {
            
            if (value.email !== null && value.role !== null) {
                // console.log(value);

                try {
                    const res = await axios.post(`http://localhost:3000/students/${value.email}`,
                        {
                            role: value.role,
                           
                        },
                    );


                    if (res.data) {
                        commit('setUserData', {userData: res.data, token: localStorage.getItem('token')})
                        // console.log(res.data);
                        // console.log(state.userData);/
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        },

        async editProfileAction({ dispatch, state }, value) {
            // console.log(state.userData.user._id);
            // console.log(state.userData);
            // console.log(localStorage.getItem('role'));

            if (value) {
                 const model = localStorage.getItem('role');
                // console.log(value.image);

                const formData = new FormData();
                formData.append('fileInput', value.image);
                formData.append('name', value.name);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                try {
                    const res = await axios.patch(`http://localhost:3000/${model}/${state.userData.user._id}`, formData, config);

                    if (res.data) {
                        alert(res.data.message);
                        dispatch('refreshUserAction', { role: model, email: state.userData.user.email });
                    }
                }catch(err){console.error(err);}
            }
        },

        async logout({ state }) {
            state.userData = {};
            state.userData.user._id = null
            localStorage.clear();
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
        userDataGetter(state) {
            // console.log(state.userData);
            return state.userData;
        }

    },
}