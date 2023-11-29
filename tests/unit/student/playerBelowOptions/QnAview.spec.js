import { shallowMount } from '@vue/test-utils'
import QnAView from '@/components/students/playerBelowOptions/QnAView.vue'
import Vuex from 'vuex'


describe('belowDetails', () => {
    let wrapper;
    let store;
    let actions;
    let getters;
    let mutations;
    beforeEach(() => {
        actions = {
            PostQnA: jest.fn(),
            editQuerry: jest.fn(),
            replyQNA: jest.fn(),
            editQnaReply: jest.fn(),
            deleteQnaReply: jest.fn(),
            removeQuerry: jest.fn(),
            getQNA: jest.fn(),

        },

            getters = {
                getCourse: () => {
                    return {
                        sections: [
                            {
                                videos: [
                                    {
                                        QnA: [
                                            {
                                                querry: {
                                                    studentID: '123',
                                                    text: 'Question'
                                                },
                                                replies: [
                                                    {
                                                        studentID: '234',
                                                        replyBy: 'student',
                                                        reply: 'Reply',
                                                    }
                                                ]
                                            }
                                        ]
                                    }]
                            }]
                    }
                },
                getterQNA: () => {
                    return [{
                        querry: {
                            studentImg: 'img.jpg',
                            studentName: 'student',
                            text: 'question'
                        },
                        replies: [
                            {
                                profileImage: 'img2.jpg',
                                reply: 'Reply'
                            }]
                    }]
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
        wrapper = shallowMount(QnAView, { global: { plugins: [store] } })
    })


    it('shows QNA\' index', () => {
        console.log(wrapper.vm.QNA)
        const val = wrapper.findAll('[data-value="avatar-post"]');
        console.log(val);
        expect(val[0].attributes('image')).toBe('http://localhost:3000/Images/img.jpg');
    });

    //   it('checks if delete and edit buttons are visible', () => {
    //     const valA = wrapper.find('[name="edit-icon"]');
    //     const valB = wrapper.find('[name="delete-icon"]');
    //     expect(valA.exists()).toBe(true);
    //     expect(valB.exists()).toBe(true);
    //   })

    //   it('Checks for all notes', () => {
    //     const val = wrapper.findAll('[name="notes-note"]');
    //     expect(val[0].text()).toBe('Note123');
    //     expect(val[1].text()).toBe('Note234');
    //     expect(val[2].text()).toBe('Note345');
    //   });

    //   it('triggers showEditDialog', () => {
    //     const vm = wrapper.vm;
    //     vm.showEditDialog("abc", "123");
    //     expect(vm.editNoteText).toBe("abc");
    //     expect(vm.editnoteID).toBe("123");
    //     expect(vm.dialog).toBe(true)
    //   })


})
