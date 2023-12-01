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
                            text: 'question',
                            studentID: '123',
                        },
                        replies: [
                            {
                                profileImage: 'img234.jpg',
                                reply: 'Reply',
                                studentID: '1234'
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
                    actions: {
                        PostQnA: jest.fn(),
                    },
                    getters
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
            }
        })

        wrapper = shallowMount(QnAView, { global: { plugins: [store] } })
    })


    it('shows QNA\' poster\'s avatar', () => {
        const val = wrapper.findAll('[data-value="avatar-post"]');
        expect(val[0].attributes('image')).toBe('http://localhost:3000/Images/img.jpg');
    });

    it('shows shows default avatar', () => {
        const val = wrapper.findAll('[name="no-avatar-post"]');
        expect(val.length).toBe(0);
    });

    it('shows name of creater of post', () => {
        const val = wrapper.find('[name="post-creater-name"]');
        expect(val.exists()).toBe(true);
        expect(val.text()).toBe('Student');
    });

    it('opens the reply dialog when "Reply" button is clicked', async () => {
        await wrapper.setData({
            dialogArray: [true],
            userName: 'john_doe',
            replyText: '',
        });

        // Finding the "Reply" button
        const replyButton = wrapper.find('[name="reply-btn"]');
        // click event
        await replyButton.trigger('click');
        // update the component
        await wrapper.vm.$nextTick();
        // Checking if the reply dialog is opened
        expect(wrapper.vm.dialogArray[0]).toBe(true);
        // Checking if the dialog contains the username
        const dialogContent = wrapper.find('[name="reply-dialog-text"]');
        expect(dialogContent.text()).toContain('Reply as John_doe,');
        const replyText = wrapper.find('[name="reply-text"]');
        expect(replyText.text()).toContain('');
    });

    it('opens the delete dialog when "delete" button is clicked', async () => {
        await wrapper.setData({
            dialog2Array: [true]
        });
        // Finding the "delete" button
        const deleteButton = wrapper.find('[name="delete-btn"]');
        expect(deleteButton.exists()).toBe(true);
        // click event
        await deleteButton.trigger('click');
        // update the component
        await wrapper.vm.$nextTick();
        // Checking if the delete dialog is opened
        expect(wrapper.vm.dialog2Array[0]).toBe(true);
    });

    it('opens the edit dialog when "edit" button is clicked', async () => {
        await wrapper.setData({
            dialog3Array: [true]
        });
        // Finding the "delete" button
        const editButton = wrapper.find('[name="edit-btn"]');
        expect(editButton.exists()).toBe(true);
        // click event
        await editButton.trigger('click');
        // update the component
        await wrapper.vm.$nextTick();
        // Checking if the delete dialog is opened
        expect(wrapper.vm.dialog3Array[0]).toBe(true);
    });

    it('shows Querry', async () => {
        const text = wrapper.find('[name="querry-text"]');
        expect(text.exists()).toBe(true);
        expect(text.text()).toBe('question');
    });

    it('shows replier avatar', async () => {
        const avatar = wrapper.find('[name="reply-avatar"]');
        expect(avatar.exists()).toBe(true);
        expect(avatar.attributes('image')).toBe('http://localhost:3000/Images/img234.jpg');
    })

    it('converts string to title case', () => {
        const vm = wrapper.vm;
        const result = vm.toTitleCase('hello world');
        expect(result).toBe('Hello World');
    });
    
   

})
