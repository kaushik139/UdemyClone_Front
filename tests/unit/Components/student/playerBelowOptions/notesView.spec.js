import { shallowMount } from '@vue/test-utils'
import NotesView from '@/components/students/playerBelowOptions/notesView.vue'
import Vuex from 'vuex'


describe('belowDetails', () => {
  let wrapper;
  let store;
  let actions;
  let getters;
  let mutations;
  beforeEach(() => {
    actions = {
      GetNotes: jest.fn(),
      CreateNote: jest.fn(),
      DeleteNote: jest.fn(),
      EditNote: jest.fn(),

    },

      getters = {
        NotesGetter: () => {
          return [
            {
              _id: '33he82hd8rfh48',
              note: 'Note123'
            },
            {
              _id: '33he82hd8rht48',
              note: 'Note234'
            },
            {
              _id: '33he82hd8rfh23',
              note: 'Note345'
            },
          ]
        },
      },
      mutations = {

      }

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
            instructor: {
              name: 'ABC',
              profileImage: 'image.jpg'
            },
          },
          actions,
          getters
        },
        auth: {
          namespaced: true,
          state: {
            userData: {
              user: {
                _id: "1"
              }
            }
          }
        }
      }
    })
    wrapper = shallowMount(NotesView, { global: { plugins: [store] } })
  })


  it('shows notes\' index', () => {
    const val = wrapper.findAll('[name="notes-index"]');
    console.log(val)
    expect(val[0].text()).toBe('1.');
    expect(val[1].text()).toBe('2.');
    expect(val[2].text()).toBe('3.');
  });

  it('checks if delete and edit buttons are visible', () => {
    const valA = wrapper.find('[name="edit-icon"]');
    const valB = wrapper.find('[name="delete-icon"]');
    expect(valA.exists()).toBe(true);
    expect(valB.exists()).toBe(true);
  })

  it('Checks for all notes', () => {
    const val = wrapper.findAll('[name="notes-note"]');
    expect(val[0].text()).toBe('Note123');
    expect(val[1].text()).toBe('Note234');
    expect(val[2].text()).toBe('Note345');
  });

  it('triggers showEditDialog', () => {
    const vm = wrapper.vm;
    vm.showEditDialog("abc", "123");
    expect(vm.editNoteText).toBe("abc");
    expect(vm.editnoteID).toBe("123");
    expect(vm.dialog).toBe(true)
  })


})
