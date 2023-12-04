import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import PricingPage from '../../../../../../src/components/instructor/createCourse/others/pricingPage.vue'; // Replace with your component file path
import Vuex from 'vuex'
import { nextTick } from 'vue';
describe('PricingPage', () => {
    let store;
    let actions;
    let getters;
    let mutations;
    let wrapper;
  let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.fn();
        
        const actions = {
            pricingAction: jest.fn(),
        };

        const getters = {
            courseDraftGetter: () => ({
                pricing: {
                    basePrice: 100,
                    discountType: 'amount',
                    discountAmount: 20,
                    discountPercent: 20
                }
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
                    actions: {
                        'instructor/pricingAction': mockDispatch,
                      },
                },
            },
        });
        wrapper = mount(PricingPage, { global: { plugins: [store] } })
    })


    it('checks if component is loaded', async () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('verifies label text', () => {
        const val = wrapper.find('[name="col-1"]')
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('Enter a Basic Amount:');

    });

    it('checks basePrice textfield', () => {
        const val = wrapper.find('[name="basePrice"]');
        expect(val.exists()).toBe(true)
    });

    it('checks basePrice textfield', () => {
        const val = wrapper.find('[name="base-price-slider"]');
        expect(val.exists()).toBe(true)
    });

  it('correctly updates basePrice when it is below 0', async () => {
    // Simulate a change in the basePrice that's below 0
    wrapper.vm.basePrice = -10;

    // Wait for Vue to update
    await wrapper.vm.$nextTick();

    // Assert that basePrice is now 0
    expect(wrapper.vm.basePrice).toBe(0);
  });

  it('correctly updates basePrice when it is above 1000', async () => {
    // Simulate a change in the basePrice that's above 1000
    wrapper.vm.basePrice = 2000;

    // Wait for Vue to update
    await wrapper.vm.$nextTick();

    // Assert that basePrice is now 1000
    expect(wrapper.vm.basePrice).toBe(1000);
  });

  it('resets discountAmount when baseSavedValue is false', async () => {
    // Set basePrice within a valid range
    wrapper.vm.basePrice = 500;

    // Set baseSavedValue to false
    wrapper.vm.baseSavedValue = false;

    // Wait for Vue to update
    await wrapper.vm.$nextTick();

    // Assert that discountAmount is reset to 0
    expect(wrapper.vm.discountAmount).toBe(0);
  });
    
    
  it('submits pricing data to the store', () => {
    // Set sample values to the properties used in the submit method
    const spy = jest.spyOn(wrapper.vm, 'submit');
    const dispatchMock = jest.spyOn(wrapper.vm.$store, 'dispatch');
    wrapper.vm.basePrice = 100;
    wrapper.vm.discountType = 'Fixed';
    wrapper.vm.discountAmount = 20;
    // Set other required properties...

    // Call the submit method
    wrapper.vm.submit();

    // Verify if the dispatch method was called with the expected parameters
    expect(dispatchMock).toHaveBeenCalledWith('instructor/pricingAction', {
      value: {
        basePrice: 100,
        discountType: 'Fixed',
        discountAmount: 20,
        "discountPercent": 0,
        "finalPrice": 115,
        "priceAfterDiscount": 100,
        "tax": 15,
        // Provide other expected values for the pricing object...
      },
    });
        spy.mockRestore();
  });

  // it('correctly updates discountAmount based on baseSavedValue', async () => {
  //   // Set basePrice within a valid range
  //   wrapper.vm.basePrice = 500;
  //   wrapper.vm.discountType = 'amount';

  //   // Set baseSavedValue to true
  //   wrapper.vm.baseSavedValue = true;

  //   // Wait for Vue to update
  //   await wrapper.vm.$nextTick();

  //   // Assert that discountAmount is updated from the getter
  //   expect(wrapper.vm.discountAmount).toBe(20); // Value from the mocked getter
  // });

});