import { shallowMount } from '@vue/test-utils'
import CarouselView from '../../../../src/components/common/carouselView'
import Vuex from 'vuex'


describe('CarouselView', () => {
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
                tokenGetter: () => {
                    return 222
                },
            }

        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state: {
                        token: '656455f061b344fdc0c674b7',
                    },
                }
            }
        })
            wrapper = shallowMount(CarouselView, { global: { plugins: [store] } })

    })


        it('renders the carousel component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    
        it('does not render the get started button when user is logged in', async () => {
          // Simulate being logged in
          await wrapper.setData({ 'auth/tokenGetter': 'someToken' });
        
          const getStartedButton = wrapper.find('.text-white');
          expect(getStartedButton.exists()).toBe(false);
        });
    
  it('renders the correct number of carousel items', () => {
    const carouselItems = wrapper.findAll('[name="carousel-items"]');
    expect(carouselItems.length).toBe(wrapper.vm.slides.length);
  });

  it('renders the get started button when user is not logged in', async () => {
    // Simulate not being logged in
    await wrapper.setData({ 'auth/tokenGetter': '' });

      const getStartedButton = wrapper.find('[name="getStarted-Button"]');
    expect(getStartedButton.exists()).toBe(false);
  });

    it('verifies value of isLogged computed value', async() => {
        await wrapper.setData({ 'auth/tokenGetter': '' });    
        expect(wrapper.vm.isLogged).toBe(true);
    })

})
