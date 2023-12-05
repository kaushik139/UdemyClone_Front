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
            'tokenGetter': () => 'token123',
            'userDataGetter': () => {
                return {
                    user: {
                        name: 'Abc',
                        email: 'a@a.com'
                    }
                }
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


        wrapper = shallowMount(ProfileChip, {
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

    it('checks if correct user email is being displayed', async () => {
        expect(wrapper.vm.userDetails).toEqual({
            name: 'Abc',
            email: 'a@a.com'
        });
    });

    it('verifies if user name is shown', async () => {
        const val = await wrapper.find('[name="user-name"]');
        expect(val.exists()).toBe(true)
    })

    it('verifies if user email is shown', async () => {
        const val = await wrapper.find('[name="user-email"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('a@a.com');
        
    })

    it('verifies logout dialog text', async () => {
        const val = await wrapper.find('[name="logout-text"]');
        const val2 = await wrapper.find('[name="logout-span"]');
        expect(val.exists()).toBe(true);
        expect(val2.exists()).toBe(true);
        expect(val.text()).toBe('Are you sure you want to Logout?');
        expect(val2.text()).toBe('Logout?');
    })

    it('checks logout dialog functions', async () => {
        // const logoutSpy = jest.spyOn(wrapper.vm, 'logout');
        const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        const yesButton = await wrapper.find('[name="logout-yes"]');
        const noButton = await wrapper.find('[name="logout-no"]');
        
        expect(yesButton.exists()).toBe(true);
        expect(noButton.exists()).toBe(true);
        expect(yesButton.text()).toBe('Yes');
        expect(noButton.text()).toBe('No');
        
        await wrapper.vm.$nextTick();
        await yesButton.trigger('click');
        // expect(logoutSpy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('auth/logout');
      });
      
    it('checks editProfile method', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        const mountSpy = jest.spyOn(wrapper.vm, 'mount')
        await wrapper.vm.editProfile();
        expect(spy).toHaveBeenCalledWith("auth/refreshUserAction", { "email": null, "role": null });
        expect(mountSpy).toHaveBeenCalled()
    });

    it('checks mount method', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        await wrapper.vm.mount();
        expect(spy).toHaveBeenCalledWith("auth/refreshUserAction", { "email": null, "role": null });
        // expect(mountSpy).toHaveBeenCalled()
    })

})
