import { mount } from '@vue/test-utils';
import SideNav from '@/components/instructor/sideNav.vue'; // Replace with your component file path
import Vuex from 'vuex'


describe('SideNav', () => {

    let store;
    let actions;
    let getters;
    let mutations;
    let wrapper;
    beforeEach(() => {
        actions = {
            coursePlayAction: jest.fn(),
            instructordetails: jest.fn(),
        },

            getters = {
                getCourse: () => {
                    return {
                        title: 'Angular',
                        description: {
                            fullDescription: "Full Description for Course Angular",
                        },
                        rating: {
                            netRating: 2,
                        },
                    }
                },
                getInstructor: () => {
                    return {
                        profileImage: "abc.jpg",
                        name: "abc"
                    }
                }
            },
            mutations = {

            }

        store = new Vuex.Store({
            modules: {
                instructor: {
                    namespaced: true,
                    state: {
                        courseID: '123',
                        courseDraft: {
                            _id: '123',
                            title: "Angular",
                            description: {
                                fullDescription: "Full Description for Course Angular",
                            },
                            instructor: "222",
                            rating: {
                                netRating: 2,
                            },
                        },
                        instructor: {
                            name: 'ABC',
                            profileImage: 'image.jpg'
                        },
                    },
                    actions,
                    getters
                },
                auth: {
                    namespaced: true,
                    state: {
                        userData: {
                            user: {
                                _id: "1"
                            }
                        }
                    },
                    getters: {
                        userDataGetter: () => {
                            return { user: 'abc' }
                        }
                    }
                }
            }
        })
        wrapper = mount(SideNav, { global: { plugins: [store] } })
    })




    it("Navigates router to instructor Home when home icon is clicked", async () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [store],
                mocks: {
                    $router: {
                        push: jest.fn(), // Mock the router's push method
                    },
                },
            },
        });
        // Check if the component exists
        expect(wrapper.exists()).toBe(true);
        await wrapper.find('[name="home-btn"]').trigger("click");
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/iHome");
    });

    it("Navigates router to create Course when Create icon is clicked", async () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [store],
                mocks: {
                    $router: {
                        push: jest.fn(), // Mock the router's push method
                    },
                },
            },
        });
        // Check if the component exists
        expect(wrapper.exists()).toBe(true);
        await wrapper.find('[name="create-btn"]').trigger("click");
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/create");
    });

});