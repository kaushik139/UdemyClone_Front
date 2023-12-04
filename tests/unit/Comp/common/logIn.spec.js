import { shallowMount } from '@vue/test-utils'
import LogIn from '../../../../src/components/common/logIn'
import Vuex from 'vuex'
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Define your routes here as necessary
  ],
});

describe('LogIn', () => {
    let wrapper;
    let store;
    let actions;
    let getters;
    let mutations;
    beforeEach(() => {
        const mockRouter = {
            push: jest.fn(), // Mock the push method
          };
        actions = {
            coursePlayAction: jest.fn(),
            instructordetails: jest.fn(),
        },
            getters = {
                tokenGetter: () => {
                    return 222
                },
            }

        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                }
            }
        })
            wrapper = shallowMount(LogIn, { global: { plugins: [store, router] } })

    })


        it('renders the carousel component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    
    it('verifies component headding', () => {
        const val = wrapper.find('[class="headdingPurple"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('Login!');
    });

    it('checks if submit button exists', () => {
        const val = wrapper.find('[type="submit"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('Log In');
    });

    it('verifies signIn button is displayed', () => {
        const val = wrapper.find('[name="signUp-button"]');
        expect(val.exists()).toBe(true);
    });

    it('checks if error message is displayed for actual error', async () => {
        await wrapper.setData({ 'errMessage': 'Error Msg' });
        await wrapper.setData({ 'errMessageVisible': true });
        const val = wrapper.find('[class="errMsg"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('Error Msg');
    });

    it('checks if error message is not displayed for no error', async () => {
        await wrapper.setData({ 'errMessage': '' });
        await wrapper.setData({ 'errMessageVisible': false });
        const val = wrapper.find('[class="errMsg"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('');
    });

    it('displays error message for missing fields', async () => {
        const showErrorSpy = jest.spyOn(wrapper.vm, 'showError');
    
        // Simulate empty fields
        await wrapper.setData({ email: '', password: '' });
        await wrapper.vm.login();
    
        expect(showErrorSpy).toHaveBeenCalledWith('All fields required!');
        // Add more assertions if the showError method has more logic to test
      });
    
    it('hides error message after a certain timeout', async () => {
        jest.useFakeTimers();
        const setTimeoutSpy = jest.spyOn(window, 'setTimeout');
    
        // Simulate calling showError method
        await wrapper.vm.showError('Error message');
        
        expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 2500);
    
        jest.runAllTimers(); // Move forward in time by 2500ms
    
        expect(wrapper.vm.errMessageVisible).toBe(false);
        jest.useRealTimers();
      });

    it('logs in with correct credentials for admin', async () => {
        const email = 'admin@example.com';
        const password = 'adminpassword';
        const adminData = { email, password };
    
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
        const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');
    
        // Simulate entering admin credentials
        await wrapper.setData({ email, password, adminData });
        await wrapper.vm.login();
    
        expect(localStorageSpy).toHaveBeenCalledWith('role', 'admin');
        expect(routerPushSpy).toHaveBeenCalledWith('adminHome');
      });
    
    it('logs in with user credentials', async () => {
        jest.useFakeTimers(); // Use fake timers

        const email = 'user@example.com';
        const password = 'userpassword';
        const userInfo = { email, password };
        const loginDispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        const showErrorSpy = jest.spyOn(wrapper.vm, 'showError');
    
        // Simulate entering user credentials
        await wrapper.setData({ email, password });
        await wrapper.vm.login();
        jest.runAllTimers(); 
        expect(loginDispatchSpy).toHaveBeenCalledWith('auth/login', { value: userInfo });
        expect(showErrorSpy).toHaveBeenCalled();
        jest.useRealTimers();
        // Add more specific assertions based on your showError method logic
      });
    
      
})
