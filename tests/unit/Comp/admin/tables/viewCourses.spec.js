import { shallowMount } from '@vue/test-utils'
import ViewCourses from '../../../../../src/components/Admin/Tables/viewCourses'
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

describe('ViewCourses', () => {
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

        getters = {
            publishedCoursesGetter: () => {
                return [
                    {
                        _id: 1,
                        title: 'Course 1',
                        instructorName: 'Instructor 1',
                        sections: [{}, {}], // Mocking some data for sections
                        status: 'published',
                    },
                    // Add more mock data as needed
                ]
            },
            navTitleGetter: () => 'View Unpublished Courses', // Mocking nav title for testing
            overviewGetter: () => ({
                publishedCourses: 5,
                unpublishedCourses: 2,
                requests: [{}, {}], // Mocking requests data
                cMonth: [20, 30, 15, 25, 10, 5, 12, 18, 22, 17, 28, 30], // Mocking cMonth data
            }),
        }


        const actions = {
            editProfileAction: jest.fn(),
            logout: jest.fn(),
            refreshUserAction: jest.fn(),
        };

        store = new Vuex.Store({
            modules: {
                admin: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                    getters, // Use getters from mockStore
                    actions,
                },
            },
        });

        wrapper = shallowMount(ViewCourses, {
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

    it('displays published courses in the table', () => {
        const tableRows = wrapper.findAll('tbody tr');
        expect(tableRows.length).toBe(1);
      });

      it('converts string to title case', () => {
        // Test cases with different inputs and expected outputs
        expect(wrapper.vm.toTitleCase('hello')).toBe('Hello');
        expect(wrapper.vm.toTitleCase('HELLO')).toBe('Hello');
        expect(wrapper.vm.toTitleCase('hELLo')).toBe('Hello');
        expect(wrapper.vm.toTitleCase('tHis Is a teST')).toBe('This Is A Test');
        expect(wrapper.vm.toTitleCase('')).toBe(''); // Empty string should return an empty string
      });
    
      it('handles null or undefined values', () => {
        // Test cases for null or undefined inputs
        expect(wrapper.vm.toTitleCase(null)).toBe('');
        expect(wrapper.vm.toTitleCase(undefined)).toBe('');
      });

})
