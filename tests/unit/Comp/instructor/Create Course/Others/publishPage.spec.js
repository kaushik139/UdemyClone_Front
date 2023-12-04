import { mount } from '@vue/test-utils';
import PublishPage from '../../../../../../src/components/instructor/createCourse/others/publishPage';

describe('PublishPage', () => {
  let wrapper;

  beforeEach(() => {
    // Mock Vuex store with necessary getters and actions
    const store = {
      getters: {
        'instructor/courseDraftGetter': {
          title: 'Sample Title',
          miniDescription: 'This is a sample description.',
          pricing: {
            finalPrice: 100,
          },
          sectionsArray: [
            { videos: [1, 2, 3], exercises: [1, 2] },
            { videos: [4, 5], exercises: [3, 4, 5] },
          ],
          image: {
            bgImage: 'sampleImage.jpg',
          },
        },
      },
      dispatch: jest.fn(),
    };

    wrapper = mount(PublishPage, {
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

  it('correctly formats title using toTitleCase method', () => {
    const title = wrapper.vm.toTitleCase('sample title');
    expect(title).toBe('Sample Title');
  });

  it('correctly fetches course details on mount', async () => {
    await wrapper.vm.mount();
    const { Course } = wrapper.vm;
    expect(Course.title).toBe('Sample Title');
    expect(Course.miniDescription).toBe('This is a sample description.');
    expect(Course.price).toBe(100);
    expect(Course.sections).toBe(2);
    expect(Course.videos).toBe(5);
    expect(Course.exercises).toBe(5);
    expect(Course.imgURL).toBe('http://localhost:3000/Images/sampleImage.jpg');
  });

  it('triggers publish action when publish method is called', () => {
    wrapper.vm.publish();
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalled();
  });



});
