import { shallowMount } from '@vue/test-utils'
import RightMenu from '@/components/students/rightMenu.vue'
import Vuex from 'vuex'

const localStorageMock = {
    getItem: jest.fn((key) => {
      if (key === 'section') return '1';
      if (key === 'viewIndex') return '2';
      return null;
    }),
  };

describe('ratingsView', () => {
    const data = [
        {
          sectionTitle: 'Section 1',
          videos: [{ title: 'Video 1' }, { title: 'Video 2' }],
          exercises: [{ title: 'Exercise 1' }, { title: 'Exercise 2' }],
        },
        // Add more sample data as needed for testing
      ];
    let wrapper;

    beforeAll(() => {
        // Mock localStorage before mounting the component
        global.localStorage = localStorageMock;
      });
  
    beforeEach(() => {
        wrapper = shallowMount(RightMenu, {
            props: {
                data,
            }
        })
    });

    afterAll(() => {
        // Clean up and reset the mock after testing
        global.localStorage = undefined;
      });


    it('renders the component properly', () => {
    expect(wrapper.exists()).toBe(true);
    });
    
  it('checks if the selectVideo method updates selectedSection and selectedVideo correctly', () => {
    const index = 1;
    const videoIndex = 0;
    wrapper.vm.selectVideo(index, videoIndex);
    expect(wrapper.vm.selectedSection).toBe(index);
    expect(wrapper.vm.selectedVideo).toBe(videoIndex);
  });

  it('checks if the selectExercise method updates selectedSection and selectedExercise correctly', () => {
    const index = 1;
    const exIndex = 0;
    wrapper.vm.selectExercise(index, exIndex);
    expect(wrapper.vm.selectedSection).toBe(index);
    expect(wrapper.vm.selectedExercise).toBe(exIndex);
  });

it('selects a video and emits player data', async () => {
    const index = 0;
    const videoIndex = 1;

    await wrapper.vm.selectVideo(index, videoIndex);

    expect(wrapper.vm.selectedSection).toBe(index);
    expect(wrapper.vm.selectedVideo).toBe(videoIndex);
    expect(wrapper.vm.selectedExercise).toBeNull();

    expect(wrapper.emitted('playerData')).toBeTruthy();
    expect(wrapper.emitted('playerData').length).toBe(1);
    expect(wrapper.emitted('playerData')[0][0]).toEqual({
      section: index,
      viewIndex: videoIndex,
      viewType: 'videos',
    });
  });

  it('selects an exercise and emits player data', async () => {
    const index = 0;
    const exIndex = 1;

    await wrapper.vm.selectExercise(index, exIndex);

    expect(wrapper.vm.selectedSection).toBe(index);
    expect(wrapper.vm.selectedExercise).toBe(exIndex);
    expect(wrapper.vm.selectedVideo).toBeNull();

    expect(wrapper.emitted('playerData')).toBeTruthy();
    expect(wrapper.emitted('playerData').length).toBe(1);
    expect(wrapper.emitted('playerData')[0][0]).toEqual({
      section: index,
      viewIndex: exIndex,
      viewType: 'exercises',
    });
  });
    
  it('initializes selectedSection from localStorage', () => {
    expect(wrapper.vm.selectedSection).toBe(0); // Check if selectedSection is initialized from localStorage
  });

  it('initializes selectedVideo from localStorage', () => {
    expect(wrapper.vm.selectedVideo).toBe(null); // Check if selectedVideo is initialized from localStorage
  });

  it('initializes selectedExercise from localStorage', () => {
    expect(wrapper.vm.selectedExercise).toBe(null); // Check if selectedExercise is initialized from localStorage
  });

  it('initializes viewType from localStorage or defaults to "videos"', () => {
    expect(wrapper.vm.viewType).toBe('videos'); // Check if viewType is initialized from localStorage or defaults to "videos"
  });
    
})
