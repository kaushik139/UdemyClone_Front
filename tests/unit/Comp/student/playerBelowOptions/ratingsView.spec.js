import { shallowMount } from '@vue/test-utils'
import RatingsView from '@/components/students/playerBelowOptions/ratingsView.vue'
import Vuex from 'vuex'

describe('ratingsView', () => {
    let wrapper;
    let store;
    let actions;
  let getters;
  
    beforeEach(() => {
        actions = {
          SubmitRating: jest.fn(),
          getRating: jest.fn()
        },

            getters = {
              RatingsGetter: () => {
                return {
                  UserRating: 3,
                  counts: {
                    rated_1: 1,
                    rated_2: 2,
                    rated_3: 3,
                    rated_4: 4,
                    rated_5: 5
                    },
                    totalRatings: 15,
                      netRated: 3.66
                    }
                },
              
            },

        store = new Vuex.Store({
            modules: {
                player: {
                    namespaced: true,
                    state: {
                        courseID: '656455f061b344fdc0c674b7',
                        course: {
                            _id: '656455f061b344fdc0c674b7',
                            title: "Angular",
                            description: {
                                fullDescription: "Full Description for Course Angular",
                            },
                            instructor: "656455a661b344fdc0c674ab",
                            rating: {
                                netRating: 2,
                            },
                      },
                      Rating: {
                  counts: {
                    rated_1: 1,
                    rated_2: 2,
                    rated_3: 3,
                    rated_4: 4,
                    rated_5: 5
                    },
                    totalRatings: 15,
                      netRated: 3.66
                        },
                        instructor: {
                            name: 'ABC',
                            profileImage: 'image.jpg'
                        },
                    },
                },
                auth: {
                    namespaced: true,
                    state: {
                        userData: {
                            user: {
                                _id: "123"
                            }
                        }
                    }
                }
          },
          
          actions: {
              SubmitRating: jest.fn().mockResolvedValue({
                rating: 2,
                text: 'qwerty',
                id: '1122',
              }),
              'player/SubmitRating': jest.fn(),
          }
        })

        wrapper = shallowMount(RatingsView, { global: { plugins: [store] } })
    })


    it('shows net rating', () => {
        const val = wrapper.find('[name="net-Rating"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('3.66 /5');
    });
  
    it('shows overview text', () => {
      const val = wrapper.find('[name="overview"]');
      expect(val.exists()).toBe(true);
      expect(val.text()).toBe('Rating overview');
    });
  
  it('shows overview text', async() => {
    await wrapper.setData({
      RatingsGetter: {
                totalRatings: 15
              }
          });
      const val = wrapper.find('[name="total-ratings"]');
      expect(val.exists()).toBe(true);
      expect(val.text()).toBe('Rated by 15 users');
  });

  it('shows value in rating span', async () => {
    await wrapper.setData({
      RatingsGetter: {
        counts: {
          rated_1: 1,
          rated_2: 2,
          rated_3: 3,
          rated_4: 4,
          rated_5: 5,
                }
              }
          });
    const val = wrapper.findAll('[data-value="rating-span"]');
    expect(val.length).toBeGreaterThanOrEqual(0);
  });

  it('dispatches "player/SubmitRating" action with correct parameters', async () => {
    wrapper.setData({
      userRating: 4, 
      userRatingText: 'Sample feedback', 
    });
    const vm = wrapper.vm;
    const spy = jest.spyOn(vm.$store, 'dispatch');
    const mountSpy = jest.spyOn(vm, 'mount');
    await vm.rate();
    expect(spy).toHaveBeenCalledWith('player/SubmitRating', {
      rating: 4, 
      text: 'Sample feedback', 
      id: expect.any(String),
    });
    spy.mockRestore();
    mountSpy.mockRestore();
  });

  it('shows an alert if both rating and feedback are not filled', async () => {
    wrapper.setData({
      userRating: 4,
    });
    const vm = wrapper.vm;
    window.alert = jest.fn();
    const mountSpy = jest.spyOn(vm, 'mount');
    await vm.rate();
    expect(window.alert).toHaveBeenCalledWith('Fill both Rating and Feedback!');
    mountSpy.mockRestore();
  });

  it('dispatches "player/getRating" action and sets data correctly', async () => {
    const vm = wrapper.vm;
    const spy = jest.spyOn(vm.$store, 'dispatch');
    vm.id = '123';
    await vm.mount();
    expect(spy).toHaveBeenCalledWith('player/getRating', '123');
    expect(vm.userRating).toBe(3); 
    expect(vm.userRatingText).toBe(''); 
    spy.mockRestore();
  }); 

})
