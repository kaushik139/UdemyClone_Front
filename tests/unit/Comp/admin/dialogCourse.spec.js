import { shallowMount } from '@vue/test-utils'
import DialogCourse from '../../../../src/components/Admin/dialogCourse'
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

describe('DialogCourse', () => {
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
                admin: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                    getters: {
                        CourseGetter: () => {
                            images: {
                                bgImage: 'abc.jpg'
                            }
                        }
                    },
                    actions,
                },
            }
        });


        wrapper = shallowMount(DialogCourse, {
            global: {
                plugins: [store, router],
                mocks: {
                    $router: mockRouter,
                },
            },
            propsData: {
                imgURl: 'url.abc.co.in',
                data: {
                    dialog: true,
                    // action: 'view',
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


})
