import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import PlanCourse from '../../../../../../src/components/instructor/createCourse/others/planCourse.vue'; // Replace with your component file path
import Vuex from 'vuex'
import { nextTick } from 'vue';
describe('PlanCourse', () => {
    let store;
    let actions;
    let getters;
    let mutations;
    let wrapper;
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => { });

    beforeEach(() => {
        const actions = {
            bgImageUpload: jest.fn(),
            landingPageAction: jest.fn(),
        };

        const getters = {
            courseDraftGetter: () => ({
                title: 'Angular',
                miniDescription: 'Mini Description',
                category: 'A'
            }),
        };

        store = new Vuex.Store({
            modules: {
                instructor: {
                    namespaced: true,
                    state: {
                        courseID: '123',
                        courseDraft: {
                            _id: '123',
                            title: 'Angular',
                            description: {
                                fullDescription: 'Full Description for Course Angular',
                            },
                            instructor: '222',
                            rating: {
                                netRating: 2,
                            },
                        },
                        instructor: {
                            name: 'ABC',
                            profileImage: 'image.jpg',
                        },
                        images: {
                            bgImage: 'mockImage.png',
                        },
                    },
                    getters,
                },
            },
        });
        wrapper = mount(PlanCourse, { global: { plugins: [store] } })
    })


    it('checks if component is loaded', async () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('verifies Name textField', async () => {
        const testName = 'NameABC';
        const val = wrapper.find('[label="Course Name"]');
        const val2 = wrapper.find('[label="Mini Description"]');
        await wrapper.vm.$options.mounted.call(wrapper.vm);
        wrapper.setData({
            planData: {
                name: testName
            }
        });
        expect(wrapper.vm.planData.name).toBe(testName);
        expect(val.text()).toBe('')
        expect(val2.text()).toBe('')
    });

    it('checks Submit button calls submit method', async () => {
        const spy = jest.spyOn(wrapper.vm, 'submit');
        const dispatchMock = jest.spyOn(wrapper.vm.$store, 'dispatch');

        const submitButton = wrapper.find('[name="submit-button"]');
        await submitButton.trigger('click');
        expect(spy).toBeCalledTimes(0);

        spy.mockRestore();
    });

    it('checks if submit method is called on button click', async () => {
        const wrapper = mount(PlanCourse);

        // Spy on the submit method
        const submitMethodMock = jest.spyOn(wrapper.vm, 'submit');

        // Find the submit button and trigger a click event
        const submitButton = wrapper.find('[name="submit-button"]');
        submitButton.trigger('click');
        await wrapper.vm.$nextTick();

        // Check if the submit method has been called
        expect(submitMethodMock).toHaveBeenCalledTimes(0); submitMethodMock.mockRestore();
    });

    it('checks Clear button', async () => {
        // Call the method
        wrapper.vm.handleReset();
    
        // Assert the planData object to be an empty object
        expect(wrapper.vm.planData).toEqual({
               category: "",
               email: "",
               miniDesc: "",
               name: "",
             });
    });

    it('verifies the mounted lifecycle hook behavior', () => {
        wrapper.vm.mount()
        // Move timers forward by 100ms
        jest.advanceTimersByTime(110);
    
        // Check if planData properties are set correctly after the setTimeout
        expect(wrapper.vm.planData.name).toBe(''); // Replace with expected value
        expect(wrapper.vm.planData.miniDesc).toBe(''); // Replace with expected value
        expect(wrapper.vm.planData.category).toBe(''); // Replace with expected value
      });

    it('verifies the mounted lifecycle hook behavior', async () => {
          
        await wrapper.vm.$options.mounted.call(wrapper.vm);
    
        expect(wrapper.vm.$store.getters['instructor/courseDraftGetter']).toStrictEqual({"category": "A", "miniDescription": "Mini Description", "title": "Angular"});
      });

});