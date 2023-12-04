import { mount } from '@vue/test-utils';
import CreatePage from '../../../../../../src/components/instructor/createCourse/createContent/createPage';
import Vuex from 'vuex'
describe('CreatePage', () => {

    let wrapper;
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => { });

    beforeEach(() => {
        wrapper = mount(CreatePage)

        jest.mock('vue-video-player', () => ({
            VideoPlayer: {
                // Mock the component's methods or properties if needed
                // For instance:
                render: jest.fn()
            }
        }));

    })

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('switches tabs on click', async () => {
        const refreshSpy = jest.spyOn(wrapper.vm, 'refresh');

        // Find the tabs and trigger a click event on one of them
        const sectionTab = wrapper.find('[value="section"]');
        await sectionTab.trigger('click');

        // Check if the refresh method was called when a tab is clicked
        expect(refreshSpy).toHaveBeenCalled();
    });


});