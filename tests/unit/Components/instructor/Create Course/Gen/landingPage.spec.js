import { mount } from '@vue/test-utils';
import LandingPage from '@/components/instructor/Create Course/Gen/landingPage.vue'; // Replace with your component file path
import Vuex from 'vuex'


describe('SideNav', () => {

    let store;
    let actions;
    let getters;
    let mutations;
    let wrapper;
    beforeEach(() => {
        actions = {
            bgImageUpload: jest.fn(),
            landingPageAction: jest.fn(),
        },

            getters = {
                courseDraftGetter: () => {
                    return {
                        title: 'Angular',
                        description: {
                            miniDescription: 'Mini Description',
                            fullDescription: "Full Description for Course Angular",
                        },
                    }
                },
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
               
            }
        })
        wrapper = mount(SideNav, { global: { plugins: [store] } })
    })

    it('handles Image input change event', () => {
        // Create a mock File object
        const file = new File(['file content'], 'test.jpg', { type: 'Image' });
    
        // Find the input element in your component (replace 'inputSelector' with the actual selector)
        const input = wrapper.find('[name="Image-File"]');
    
        // Trigger a change event with the mock File object as the input's value
        input.element.files = [file];
        input.trigger('change');
    
        // Add your assertions to test the component's behavior after the file input change event
      });



    it("previews Uploaded Image File", async () => {
        const val = wrapper.find('[name="Upload-Btn"]');
        
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