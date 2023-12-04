import { mount } from '@vue/test-utils';
import PlanCourse from '../../../../../../src/components/instructor/createCourse/others/planCourse.vue';

describe('PlanCourse', () => {
    let wrapper;

    beforeEach(() => {
        jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());

        // Mock Vuex store with necessary getters and actions
        const store = {
            getters: {
                'instructor/courseDraftGetter': {
                    title: 'Sample Title',
                    miniDescription: 'This is a sample description.',
                    category: 'Category A',
                },
            },
            dispatch: jest.fn(),
        };

        wrapper = mount(PlanCourse, {
            global: {
                mocks: {
                    $store: store,
                },
            },
        });
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('sets form values according to course draft on mount', async () => {
        await wrapper.vm.mount();
        const { planData } = wrapper.vm;
        expect(planData.name).toBe('Sample Title');
        expect(planData.miniDesc).toBe('This is a sample description.');
        expect(planData.category).toBe('Category A');
    });

    it('submits the form with valid data', async () => {
        wrapper.setData({
            planData: {
                name: 'Test Course',
                miniDesc: 'Test description',
                category: 'Category B',
            },
        });

        // Mock dispatch method
        const dispatchMock = jest.spyOn(wrapper.vm.$store, 'dispatch');

        // Call the component's submit method directly
        await wrapper.vm.submit();

        // Assert dispatch call
        expect(dispatchMock).toHaveBeenCalledWith(
            'instructor/planCourseAction',
            expect.objectContaining({
                name: 'Test Course',
                miniDesc: 'Test description',
                category: 'Category B',
                email: null,
            })
        );

        // Restore the spy
        dispatchMock.mockRestore();
    });

    it('clears form fields on clear button click', async () => {
        const spy = jest.spyOn(wrapper.vm, 'handleReset');

        // Set form data
        await wrapper.setData({
            planData: {
                name: 'Test Course',
                miniDesc: 'Test description',
                category: 'Category B',
            },
        });

        // Trigger clear button click
        const clearButton = await  wrapper.find('[name="clear"]');
        await clearButton.trigger('click');
        expect(spy).toBeCalledTimes(1);
        // Assert form fields are cleared
        expect(wrapper.vm.planData.name).toBe('');
        expect(wrapper.vm.planData.miniDesc).toBe('');
        expect(wrapper.vm.planData.category).toBe('');
    });

});
