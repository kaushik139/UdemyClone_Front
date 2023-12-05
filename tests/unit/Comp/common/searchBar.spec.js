import { shallowMount } from '@vue/test-utils'
import SearchBar from '../../../../src/components/common/searchBar'
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

describe('SearchBar', () => {
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
            'showCourseGetter': () => {
                return {
                    sections: [
                        { videos: [1, 2, 3], exercises: [4, 5] },
                        { videos: [], exercises: [] },
                      ],
                      price: { finalAmount: 50, tax: 5 },
                      enrollment: [{ studentID: 'user123' }],
                      images: { bgImage: 'yourImage.jpg' },
                      instructor: 'John Doe',
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
                search: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                    getters,
                    actions,
                },
            }
        });


        wrapper = shallowMount(SearchBar, {
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

    it('renders the search form', () => {
        expect(wrapper.find('form').exists()).toBe(true);
    });

    it('converts a lowercase string to title case', () => {
        const input = 'hello world';
        const expectedResult = 'Hello World';
        const result = wrapper.vm.toTitleCase(input);
        expect(result).toBe(expectedResult);
    });
    
    it('converts an uppercase string to title case', () => {
        const input = 'HELLO WORLD';
        const expectedResult = 'Hello World';
        const result = wrapper.vm.toTitleCase(input);
        expect(result).toBe(expectedResult);
      });
    
      it('handles an empty string', () => {
        const input = '';
        const expectedResult = '';
        const result = wrapper.vm.toTitleCase(input);
        expect(result).toBe(expectedResult);
      });
    
      it('handles null or undefined input', () => {
        expect(wrapper.vm.toTitleCase(null)).toBe('');
        expect(wrapper.vm.toTitleCase(undefined)).toBe('');
      });
    
      it('handles a single word string', () => {
        const input = 'hello';
        const expectedResult = 'Hello';
        const result = wrapper.vm.toTitleCase(input);
        expect(result).toBe(expectedResult);
      });
    
    it('performs search when form is submitted', async () => {
        const searchText = 'Sample Search Text';
        wrapper.setData({ searchText });
    
        const form = wrapper.find('form');
        await form.trigger('submit.prevent');
    });

    it('calls searchAction with searchText', async () => {
        const searchText = 'search text';
        const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
    
        // Set searchText in the component
        wrapper.setData({ searchText });
    
        // Trigger the search method
        await wrapper.vm.search();
    
        // Check if dispatch was called with the correct action and payload
        expect(dispatchSpy).toHaveBeenCalledWith('search/searchAction', searchText);
    });
    
    it('sets courseData and related variables correctly after showCourseAction dispatch', async () => {
        const mockShowCourseGetter = {
          sections: [
            { videos: [1, 2, 3], exercises: [4, 5] },
            { videos: [], exercises: [] },
          ],
          price: { finalAmount: 50, tax: 5 },
          enrollment: [{ studentID: 'user123' }],
          images: { bgImage: 'yourImage.jpg' },
          instructor: 'John Doe',
        };
        const courseID = 'course123';
        const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
        
        wrapper.vm.$store.dispatch.mockResolvedValue(mockShowCourseGetter);
    
        await wrapper.vm.showCourse(courseID);
    
        expect(dispatchSpy).toHaveBeenCalledWith('search/showCourseAction', courseID);
    
        expect(wrapper.vm.courseData.Course).toEqual(mockShowCourseGetter);
        expect(wrapper.vm.viewVideos).toBe(3); //  3 (1 + 2 + 0)
        expect(wrapper.vm.viewExercises).toBe(2); //  2 (2 + 0)
        expect(wrapper.vm.viewRevenue).toBe(45); // (50 - 5) * 1
        expect(wrapper.vm.courseData.ImgURL).toBe('http://localhost:3000/Images/yourImage.jpg');
        expect(wrapper.vm.courseData.instructor).toBe('John Doe');
        expect(wrapper.vm.courseData.purchased).toBe(false);
        expect(wrapper.vm.courseData.dialog).toBe(true);
        expect(wrapper.vm.courseData.user).toBe('search');
        expect(wrapper.vm.courseData.action).toBe('search');

      });
    
   
})
