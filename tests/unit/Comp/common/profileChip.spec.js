import { shallowMount } from '@vue/test-utils'
import ProfileChip from '../../../../src/components/common/profileChip'
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

describe('ProfileChip', () => {
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
            wrapper = shallowMount(ProfileChip, { global: { plugins: [store, router] } })

    })


        it('renders the component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    
        it('verifies editProfile method', async () => {
            const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
            wrapper.setData({
              editName: 'ABC',
              editImage: [{ name: 'abc.jpg' }],
              editDialog: true,
            });
        
            await wrapper.vm.editProfile();
        
            expect(dispatchSpy).toHaveBeenCalledTimes(2);
            expect(wrapper.vm.editDialog).toBe(false);
            expect(wrapper.vm.editImage).toBeNull();
          });
        
          it('verifies logout method', async () => {
              const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
              const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');
            wrapper.setData({ logoutDialog: true });
        
            await wrapper.vm.logout();
        
            expect(wrapper.vm.logoutDialog).toBe(false);
            expect(dispatchSpy).toHaveBeenCalledWith('auth/logout');
            expect(routerPushSpy).toHaveBeenCalledWith('/');
        });
  
})
