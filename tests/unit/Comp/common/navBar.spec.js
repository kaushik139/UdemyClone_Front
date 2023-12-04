import { shallowMount } from '@vue/test-utils'
import NavBar from '../../../../src/components/common/navBar'
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

describe('NavBar', () => {
    let wrapper;
    let store;
    let actions;
    let getters;
    let mutations;
    let setItemSpy;

    beforeAll(() => {
        // Mock localStorage before mounting the component
        global.localStorage = localStorageMock;
      });

    beforeEach(() => {
        setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

        const mockRouter = {
            push: jest.fn(), // Mock the push method
          };
        actions = {
            editProfileAction: jest.fn(),
            logout: jest.fn(),
            refreshUserAction: jest.fn(),
        },

            store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                    dispatch: jest.fn(),
            commit: jest.fn(),
            getters: {
            'auth/tokenGetter': () => 'token123', // Mock tokenGetter as a function returning a string
            'auth/userDataGetter': () => ({ user: 'students' }), // Mock userDataGetter as a function returning an object with a 'user' property
                    },
                    actions: {
                        editProfileAction: jest.fn()
            }
                }
            }
        })
            wrapper = shallowMount(NavBar, { global: { plugins: [store, router] } })

    })


        it('renders the carousel component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    
        it('verifies if the logo is rendered correctly', () => {
            const logo = wrapper.find('.navbar-brand');
            expect(logo.exists()).toBe(true);
            expect(logo.text()).toBe('UDEMY');
        });
    
        it('checks if the login and sign-up links are present when the user is not logged in', () => {
            const loginLink = wrapper.find('router-link[to="/auth/l"]');
            const signupLink = wrapper.find('router-link[to="/auth/s"]');
        
            expect(loginLink.exists()).toBe(false);
            expect(signupLink.exists()).toBe(false);
          });
        
          it('verifies the visibility of the search bar based on user role', () => {
            expect(wrapper.vm.showSearch).toBe(false);
          });
    
          it('checks if showTeach Button is visible for correct values', async () => {
            wrapper.setData({ getUser: 'students' });
          
            expect(wrapper.vm.showTeachBtn).toBe(false);
          });
    
          it('checks if showTeach Button is not visible for wrong values', async () => {
            wrapper.setData({ getUser: 'instructors' });
          
            expect(wrapper.vm.showTeachBtn).toBe(false);
          });
    
          it('checks if showStudent Button is visible for correct values', async () => {
            wrapper.setData({ getUser: 'instructors' });
          
            expect(wrapper.vm.showTeachBtn).toBe(false);
          });
    
          it('checks if showTeach Button is not visible for wrong values', async () => {
            wrapper.setData({ getUser: 'students' });
          
            expect(wrapper.vm.showTeachBtn).toBe(false);
          });
    
    it('checks if switchToTeacher Button works', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'commit');
            wrapper.setData({ getUser: 'students' });
      await wrapper.vm.switchToTeacher();
      expect(spy).toHaveBeenCalledWith('changeUser', 'instructors');
      expect(setItemSpy).toHaveBeenCalledWith('role', 'instructors');
    });
    
    it('checks if switchToStudent Button works', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'commit');
            wrapper.setData({ getUser: 'instructors' });
      await wrapper.vm.switchToStudent();
        expect(spy).toHaveBeenCalledWith('changeUser', 'students');
        expect(setItemSpy).toHaveBeenCalledWith('role', 'students');
    });
    
    it('verifies editProfile method', async () => {
        wrapper.vm.editName = 'ABC';
        wrapper.vm.editImage = [{ name: 'abc.jpg' }];
        const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        const mountSpy = jest.spyOn(wrapper.vm, 'mount');
      
        await wrapper.vm.editProfile();
      
        expect(dispatchSpy).toHaveBeenCalledWith('auth/editProfileAction', {
          name: 'ABC',
          image: wrapper.vm.editImage[0] ? wrapper.vm.editImage[0] : ''
        });
        expect(wrapper.vm.editDialog).toBe(false);
        expect(mountSpy).toHaveBeenCalled();
      });
      
    it('checks mount method', async () => {
        const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');

  await wrapper.vm.mount();

  expect(dispatchSpy).toHaveBeenCalledWith('auth/refreshUserAction', {
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
  });
        
  await wrapper.vm.$nextTick();

        expect(wrapper.vm.isLogged).toBe(false)
    })
    
    it('verifies Mounted block', async () => {
        const spy = jest.spyOn(wrapper.vm, 'mount');
        await wrapper.vm.$nextTick();
      
        expect(spy).toHaveBeenCalledTimes(0);
      });
      
  
})
