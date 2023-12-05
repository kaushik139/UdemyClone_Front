import { shallowMount } from '@vue/test-utils'
import ViewCoursePage from '../../../../src/components/common/viewCoursePage'
import Vuex from 'vuex'
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [],
});
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'email') return 'a@a.com';
        if (key === 'role') return 'instructors';
        if (key === 'roleI') return 'instructors';
        return null;
    }),
};

describe('ViewCoursePage', () => {
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
            'instructors': () => 'token123',
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


        wrapper = shallowMount(ViewCoursePage, {
            global: {
                plugins: [store, router],
                mocks: {
                    $router: mockRouter,
                },
            },
            propsData: {
                data: {
                    dialog: true,
                    // action: 'view',
                    ImgURL: 'url.abc.co.in',
                    instructor: 'token123',
                    Course: {
                      description: {
                        fullDescription: 'abc',
                        miniDescription: '123abc'
                        },
                        enrollment: [
                            {studentID: 123},
                            {studentID: 234},
                            {studentID: 345},
                            {studentID: 456},
                        ],
                        sections: [
                            {
                                videos: [
                                    { title: 'abc' },
                                    { title: 'abc2' },
                                    { title: 'abc3' },
                                ],
                                exercises: []
                            }
                        ],
                        price: {
                            finalAmount: 200
                        },
                        rating: {
                            netRating: 2
                        },
    
                    }
                  }
            }
        });

    });


    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('checks close button', async () => {
        const val = wrapper.find('[name="close"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('Close');

        await val.trigger('click');
        expect(wrapper.vm.data.dialog).toBe(false)
    })

    it('checks functions of purchase button', async () => {
        const btn = wrapper.find('[name="purchase-button"]');
        expect(btn.exists()).toBe(false);
           
        wrapper.vm.data.action = 'view';
        wrapper.vm.data.user = "student";
        expect(btn.exists()).toBe(false);
    });

    it('checks is revenue is shown', async () => {
        const val = wrapper.find('[name="revenue"]');
        expect(val.exists()).toBe(false);
    })

    it('checks if learn now button is rendered', async () => {
        const val = await wrapper.find('[name="learn"]');
        expect(val.exists()).toBe(false);
    });  

})
