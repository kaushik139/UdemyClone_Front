import { mount } from '@vue/test-utils';
import SideMenu from '../../../../../../src/components/instructor/createCourse/nav/sideMenu'; // Replace with your component file path
import Vuex from 'vuex'
describe('SideMenu', () => {
    let store;
    let actions;
    let getters;
    let mutations;
    let wrapper;
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => { });

    beforeEach(() => {
        const commit = jest.fn();
        const getters = {
            'instructor/currentCompGetter': 'PublishPage',
          };

        const store = new Vuex.Store({
            modules: {
                instructor: {
                    namespaced: true,
                    state: {
                        currentComp: 'planCourse',
                        courseDraft: {
                            title: 'Sample Title', // Mocked courseDraft data
                          },
                    },
                    commit: jest.fn(),
                },  
            },
        });
        wrapper = mount(SideMenu, { global: { plugins: [store] } })
    })

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
      });
    
    it('activates the appropriate tab on click', async () => {
        const spy = jest.spyOn(wrapper.vm.$store, 'commit')
        // Trigger click event on a list item
        const planCourseTab = wrapper.find('[title="Plan Course"]');
        // console.log(planCourseTab);
        await planCourseTab.trigger('click');
    
        // Check if the store commit was called with the expected value
        await wrapper.vm.$nextTick();
        expect(spy).toHaveBeenCalledWith(
            'instructor/changeCurrentComp',
            'PlanCourse'
        );
    });


    it('activates currentComponent method on click', async () => {
        const spy = jest.spyOn(wrapper.vm, 'currentComponent')
        // Trigger click event on a list item
        const planCourseTab = wrapper.find('[title="Plan Course"]');
        // console.log(planCourseTab);
        await planCourseTab.trigger('click');
    
        // Check if the store commit was called with the expected value
        await wrapper.vm.$nextTick();
        expect(spy).toHaveBeenCalled();
    });
});