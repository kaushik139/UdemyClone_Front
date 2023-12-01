import { shallowMount } from '@vue/test-utils'
import BelowDetails from '@/components/students/playerBelowOptions/belowDetails.vue'
import Vuex from 'vuex'


describe('belowDetails', () => {
    let wrapper;
    let store;
    let actions;
    let getters;
    let mutations;
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
                player: {
                    namespaced: true,
                    state: {
                        courseID: '656455f061b344fdc0c674b7',
                        course: {
                            _id: '656455f061b344fdc0c674b7',
                            title: "Angular",
                            description: {
                                fullDescription: "Full Description for Course Angular",
                            },
                            instructor: "656455a661b344fdc0c674ab",
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
                }
            }
        })
        wrapper = shallowMount(BelowDetails, { global: { plugins: [store] } })
    })


    it('shows instructor name', () => {
        expect(wrapper.find('[data-value="instructor-name"]').text()).toBe("Abc")
    }),

    it('shows instructor image', () => {    
        const val = wrapper.find('[data-value="image"]');        
        expect(val.exists()).toBe(true);    
        expect(val.attributes('src')).toBe('http://localhost:3000/Images/abc.jpg');    
    });
    
    it('shows course title', () => {    
        const val = wrapper.find('[data-value="course-title"]');        
        expect(val.exists()).toBe(true);    
        expect(val.text()).toBe('Angular');    
    });
    
    it('shows course fullDescription', () => {    
        const val = wrapper.find('[data-value="course-fullDescription"]');        
        expect(val.exists()).toBe(true);    
        expect(val.text()).toBe("Full Description for Course Angular");    
      });
})
