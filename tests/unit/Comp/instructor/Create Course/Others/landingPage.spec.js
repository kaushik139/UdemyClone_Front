import { mount } from '@vue/test-utils';
import LandingPage from '../../../../../../src/components/instructor/createCourse/others/landingPage.vue'; // Replace with your component file path
import Vuex from 'vuex'
describe('LandingPage', () => {
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
                description: {
                    miniDescription: 'Mini Description',
                    fullDescription: 'Full Description for Course Angular',
                },
                image: {
                    bgImage: 'mockImage.png',
                },
                fullDescription: 'Full Description for Course Angular',
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
        wrapper = mount(LandingPage, { global: { plugins: [store] } })
    })


    it('checks if component is loaded', async () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('handles Image input change event', () => {
        const file = new File(['file content'], 'test.jpg', { type: 'Image' });
        const input = wrapper.find('[name="Image-File"]');
        const event = {
            target: {
                files: [file],
            },
        };
        input.element.dispatchEvent(new Event('change', event));
        input.trigger('change');
        expect(wrapper.vm.selectedFile[0]).toBe(undefined)
    });

    it("checks if clicking on upload button triggers upload method", async () => {
        // Spy on the component's method
        const dispatchMock = jest.spyOn(wrapper.vm.$store, 'dispatch');
        // Mocking selectedFile to simulate a file being present
        wrapper.setData({ selectedFile: ['mockFile'] });
        // Find the upload button
        const btn = wrapper.find('[name="Upload-Btn"]');
        // Trigger a click event on the button
        await btn.trigger('click');
        // Check if the `dispatch` method of the store has been called
        expect(dispatchMock).toHaveBeenCalledWith('instructor/bgImageUpload', 'mockFile');
        // Restore the spy
        dispatchMock.mockRestore();
    });


    it('verifies Image Preview flow', async () => {
        await wrapper.vm.getPreview();
        const expectedImgURL = 'http://localhost:3000/Images/mockImage.png';
        expect(wrapper.vm.imgURL).toBe(expectedImgURL);
    });

    it('checks conditional rendering based on isSelectedFile', async () => {
        // Mock data
        wrapper.setData({
            isSelectedFile: true, // Set isSelectedFile to true
            selectedFile: [new File(['file content'], 'test.jpg', { type: 'image/jpeg' })], // Mock selectedFile array with a File object
        });

        // Wait for Vue to update
        await wrapper.vm.$nextTick();

        // Find elements based on conditions
        const selectedFileElement = wrapper.find('[name="Image-File-Name"]');
        const noFileSelectedElement = wrapper.find('[name="No-Image-File-Name"]');

        // Assert that the element with the file name is rendered when isSelectedFile is true
        expect(selectedFileElement.exists()).toBe(true);
        expect(selectedFileElement.text()).toBe('Selected File: test.jpg');
        expect(noFileSelectedElement.exists()).toBe(false);
    });

    it('checks fullDescription text', async () => {
        // Simulate mounted lifecycle hook
        await wrapper.vm.$options.mounted.call(wrapper.vm);
        await wrapper.vm.$nextTick();
        const textArea = wrapper.find('[name="Full-Description"]');
        expect(textArea.element.value).toBe(undefined);
    })

    it('verifies the mounted lifecycle hook behavior', async () => {
        // Create a spy for the getPreview method
        const getPreviewSpy = jest.spyOn(wrapper.vm, 'getPreview');

        // Simulate mounted lifecycle hook
        await wrapper.vm.$options.mounted.call(wrapper.vm);

        // Check if fullDesc is set correctly
        expect(wrapper.vm.fullDesc).toBe('Full Description for Course Angular');

        // Check if getPreview method was called
        expect(getPreviewSpy).toHaveBeenCalled();

        // Restore the spy
        getPreviewSpy.mockRestore();
    });


});