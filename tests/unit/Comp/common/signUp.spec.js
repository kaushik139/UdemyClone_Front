import { shallowMount } from '@vue/test-utils'
import SignUp from '../../../../src/components/common/signUp'
import Vuex from 'vuex'
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [],
});
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'email') return 'a@a.com';
        if (key === 'roleS') return 'students';
        if (key === 'roleI') return 'instructors';
        return null;
    }),
};

describe('SignUp', () => {
    let wrapper;
    let store;
    let actions;
    let getters;
    let mutations;
    let setItemSpy;
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => { });
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    beforeAll(() => {
        // Mocking localStorage before mounting the component
        global.localStorage = localStorageMock;
    });

    beforeEach(() => {
        const mockRouter = {
            push: jest.fn(), // Mocking push method
        };

        const getters = {
            'getUser': () => {
                return state.User;
            },
        }
        const mutations = {
            setUser(state, user) {
                state.User = user;
            }
        }

        const actions = {
            editProfileAction: jest.fn(),
            logout: jest.fn(),
            refreshUserAction: jest.fn(),
        };

        const mockedUserData = {
            name: 'Abc',
            email: 'a@a.com'
        };

        store = new Vuex.Store({
            state: {
                User: 'students',
            },
            getters: {
                // This mocks the root getter 'getUser' in the store
                getUser: () => 'students', // Set the default value for 'getUser'
            },
            modules: {
                auth: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                    getters,
                    actions,
                },
            }
        });


        wrapper = shallowMount(SignUp, {
            global: {
                plugins: [store, router],
                mocks: {
                    $router: mockRouter,
                },
            },
        });
    });


    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
    
    it('sets the button class based on getUser', async () => {
        // Ensure that the initial state is as expected
        expect(wrapper.vm.bttn).toBe('bttnStu');
    
        // Mock the root getter 'getUser' value
        // store.commit('setUser', 'instructors');
        
        // Trigger the update
        // await wrapper.vm.$nextTick();
    
        // Expectation should match the updated value of 'bttn'
        // expect(wrapper.vm.bttn).toBe('bttnIns');
    });
    
    it('sets contain class based on getUser', async () => {
        // Simulate different getUser values
        // await wrapper.setData({ getUser: 'instructors' });
        // expect(wrapper.vm.contain).toBe('containIns');
    
        await wrapper.setData({ getUser: 'students' });
        expect(wrapper.vm.contain).toBe('containStu');
    });
    
    it('sets symbol color based on getUser', async () => {
        // Simulate different getUser values
        // await wrapper.setData({ getUser: 'instructors' });
        // expect(wrapper.vm.symbol).toBe('rgb(131, 0, 0)');
    
        await wrapper.setData({ getUser: 'students' });
        expect(wrapper.vm.symbol).toBe('purple');
    });
    
    it('checks submit method with correct values', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        // const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');

        wrapper.vm.name = 'Abc';
        wrapper.vm.email = 'a@a.com';
        wrapper.vm.password = 'Abcdef123';

        await wrapper.vm.submit();
        await wrapper.vm.$nextTick();

        expect(spy).toHaveBeenCalledWith("auth/signUp", {
            "value": {
                "name": "Abc",
                "email": "a@a.com",
                "password": "Abcdef123",
            },
        });
        // expect(routerPushSpy).toHaveBeenCalled();

    });

    it('checks submit method with wrong values', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        wrapper.vm.name = 'A';
        wrapper.vm.email = 'a@a';
        wrapper.vm.password = 'Abcde';

        await wrapper.vm.submit();
        await wrapper.vm.$nextTick();

        expect(spy).toHaveBeenCalledTimes(0);
        expect(alertMock).toHaveBeenCalledWith('Bad Request! Try again');

        spy.mockRestore();
        alertMock.mockRestore();

    });

    it('checks clearForm Method', async () => {
        wrapper.vm.name = 'abc'
        wrapper.vm.email = 'a@a.com'
        wrapper.vm.password = 'aqws123'
        await wrapper.vm.clearForm();
        expect(wrapper.vm.name).toBe('')
        expect(wrapper.vm.email).toBe('')
        expect(wrapper.vm.password).toBe('')
    })

})
