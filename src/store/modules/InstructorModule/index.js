import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        instructorId: '',
        currentComp: 'PlanCourse',
        courseDraft: {
            id: '',
            title: '',
            miniDescription: '',
            instructor: '',
            category: '',
            fullDescription: '',
            image: {
                thumbnail: null,
                bgImage: null,
            },
            pricing: {
                basePrice: 0,
                discountType: '',
                discountAmount: 0,
                discountPercent: 0,
                priceAfterDiscount: 0,
                tax: 0,
                finalPrice: 0
            },
            currentSectionsTitle: '',
            currentVideoTitle: '',
            currentVideoPath: '',
            CurrentExerciseTitle: '',
            CurrentExercisePath: '',
            rating: '',
            duration: '',
            lectures: '',
            status: '',
            currentSection:
            {
                sectionName: "",
                sectionDescription: "",
            },
            sectionsArray: []

        },

    },


    mutations: {
        changeCurrentComp(state, val) {
            state.currentComp = val;
        },

        planCourse(state, val) {
            state.courseDraft.title = val.title;
            state.courseDraft.miniDescription = val.miniDescription;
            state.courseDraft.category = val.category;
            state.courseDraft.id = val.id;
            // console.log(state.courseDraft.title);
        },

        pricing(state, val) {
            state.courseDraft.pricing.basePrice = val.basePrice;
            state.courseDraft.pricing.discountType = val.discountType;
            state.courseDraft.pricing.discountAmount = val.discountAmount;
            state.courseDraft.pricing.discountPercent = val.discountPercent;
            state.courseDraft.pricing.priceAfterDiscount = val.priceAfterDiscount;
            state.courseDraft.pricing.tax = val.tax;
            state.courseDraft.pricing.finalPrice = val.finalPrice;
        },

        updateCourseDraft(state, val) {
            if (val.fullDescription) state.courseDraft.fullDescription = val.fullDescription;
            if (val.bgImage) state.courseDraft.image.bgImage = val.bgImage;
            //section Updater
            if (val.sectionsArray) state.courseDraft.sectionsArray = val.sectionsArray
            //

        },

        clearCourseDraft(state) {
            state.courseDraft.id = '';
            state.courseDraft.title = '';
            state.courseDraft.miniDescription = '';
            state.courseDraft.instructor = '';
            state.courseDraft.category = '';
            state.courseDraft.fullDescription = '';
            state.courseDraft.image.thumbnail = null;
            state.courseDraft.image.bgImage = null;
            state.courseDraft.pricing.basePrice = 0;
            state.courseDraft.pricing.discountType = '';
            state.courseDraft.pricing.discountAmount = 0;
            state.courseDraft.pricing.discountPercent = 0;
            state.courseDraft.pricing.priceAfterDiscount = 0;
            state.courseDraft.pricing.tax = 0;
            state.courseDraft.pricing.finalPrice = 0;
            state.courseDraft.currentSectionsTitle = '';
            state.courseDraft.currentVideoTitle = '';
            state.courseDraft.currentVideoPath = '';
            state.courseDraft.CurrentExerciseTitle = '';
            state.courseDraft.CurrentExercisePath = '';
            state.courseDraft.rating = '';
            state.courseDraft.duration = '';
            state.courseDraft.lectures = '';
            state.courseDraft.status = '';
            state.courseDraft.sectionsArray = [];

            console.log('Cleared!');
        }



    },


    actions: {

        //for getting current draft course
        async getDraftCourse({ commit, state }, value) {
            // console.log(value);

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/${value}`)

                    if (res) {
                        // console.log(res.data.item.title);
                        // console.log(res.data.item.price.basePrice);
                        // console.log(state.courseDraft.pricing);
                        // console.log(res.data.item.sections);

                        await commit('planCourse', { title: res.data.item.title, miniDescription: res.data.item.description.miniDescription, category: res.data.item.category, id: value });
                        await commit('pricing', {
                            basePrice: res.data.item.price.basePrice,
                            discountType: res.data.item.price.discountType,
                            discountAmount: res.data.item.price.discountAmount,
                            discountPercent: res.data.item.price.discountPercent,
                            priceAfterDiscount: res.data.item.price.priceAfterDiscount,
                            tax: res.data.item.price.tax,
                            finalPrice: res.data.item.price.finalPrice,
                        });
                        await commit('updateCourseDraft', {
                            bgImage: res.data.item.images.bgImage,
                            fullDescription: res.data.item.description.fullDescription,
                            sectionsArray: res.data.item.sections,

                        })
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            else console.log('No Value');

        },

        // for PlanCourse Component -> used in instructor: create course/ plan course
        async planCourseAction({ commit }, { value }) {
            // console.log('value: '+value);

            try {
                const res = await axios.post(
                    'http://localhost:3000/courses',
                    {
                        title: value.name,
                        miniDescription: value.miniDesc,
                        email: value.email,
                        category: value.category
                    }
                )
                if (res.status === 201) {
                    // console.log('message: '+res.data.message);
                    // console.log('res->id: '+ res.data.id);
                    alert("Course Planning Completed!");
                    // console.log(value);
                    await commit('planCourse', { title: value.name, miniDescription: value.miniDesc, category: value.category, id: res.data.id });
                    await commit('changeCurrentComp', 'LandingPage');
                    localStorage.setItem('courseDraft', res.data.id);
                }
                // console.log(res.status + ': ' + res.statusText);
            }
            catch (err) {
                alert('Front: ' + err);
            }
        },

        //for pricing Component -> used in instructor: create course/ pricing page
        async pricingAction({ commit, state }, { value }) {

            console.log(value.finalPrice);

            try {
                const res = await axios.patch(`http://localhost:3000/courses/pricing/${state.courseDraft.id}`, {
                    basePrice: value.basePrice,
                    discountType: value.discountType,
                    discountAmount: value.discountAmount,
                    discountPercent: value.discountPercent,
                    priceAfterDiscount: value.priceAfterDiscount,
                    tax: value.tax,
                    finalPrice: value.finalPrice,
                })
                if (res.status === 200) {
                    console.log(res);
                    alert(res.data.message);
                    await commit('pricing', {
                        basePrice: value.basePrice,
                        discountType: value.discountType,
                        discountAmount: value.discountAmount,
                        discountPercent: value.discountPercent,
                        priceAfterDiscount: value.priceAfterDiscount,
                        tax: value.tax,
                        finalPrice: value.finalPrice
                    });
                    await commit('changeCurrentComp', 'PublishPage')
                }
            }
            catch (err) {
                alert(err)
            }
        },

        //for course landing page description
        async landingPageAction({ commit, state }, value) {
            console.log(value);

            try {
                const res = await axios.patch(
                    `http://localhost:3000/courses/landingPage/${state.courseDraft.id}`, { desc: value });

                if (res.data.message === "Updated") {
                    alert('Landing Page Updated');
                    commit('updateCourseDraft', { fullDescription: value })
                }
            }
            catch (err) {
                alert(err);
            }
        },

        //for course landing page, background Image
        async bgImageUpload({ commit, state }, value) {
            try {
                // console.log(value);

                const formData = new FormData();
                formData.append('fileInput', value);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                const res = await axios.patch(
                    `http://localhost:3000/courses/landingPageImage/${state.courseDraft.id}`,
                    formData,
                    config
                );


                if (res.data.message === "Updated") {
                    alert("Image Uploaded");
                    commit('updateCourseDraft', { bgImage: res.data.path })
                }
            }
            catch (err) {
                alert(err);
            }
        },

        //to create Sections, Videos, exercises
        async CreateSection({ commit, state }, value) {
            console.log(value.sectionName);

            try {
                const res = await axios.patch(`http://localhost:3000/courses/CreateSection/${state.courseDraft.id}`,
                    {
                        sectionTitle: value.sectionName,
                        sectionDescription: value.sectionDescription
                    });

                if (res) {
                    alert(res.data.message)
                    commit('updateCourseDraft', { sectionName: value.sectionName, sectionDescription: value.sectionDescription })
                }
            }
            catch (err) {
                alert(err)
            }
        },

        //to update Sections, Videos, exercises
        async UpdateSection({ commit, state }, value) {
            //  console.log(value.form.sectionName);
            //  console.log(value.index);

            try {
                const res = await axios.patch(`http://localhost:3000/courses/UpdateSection/${state.courseDraft.id}`,
                    {
                        sectionTitle: value.form.sectionName,
                        sectionDescription: value.form.sectionDescription,
                        index: value.index
                    });

                if (res) {
                    alert(res.data.message)
                    commit('updateCourseDraft', { sectionName: value.sectionName, sectionDescription: value.sectionDescription })
                }
            }
            catch (err) {
                alert(err)
            }
        },

        async DeleteSection({ commit, state }, value) {
            console.log(value);

            try {
                const res = await axios.delete(`http://localhost:3000/courses/deleteSection/${state.courseDraft.id}`,
                    { data: { index: value } });
                if (res) {
                    alert(res.data.message);
                }
            }
            catch (err) {
                alert(err)
            }
        },

        //to create new video lectures
        async CreateVideo({ Commit, state }, value) {
            console.log(value.videoTitle);

            try {
                const res = await axios.patch(`http://localhost:3000/courses/createVideoLecture/${state.courseDraft.id}`, {
                    videoTitle: value.videoTitle,
                    sectionIndex: value.sectionIndex
                });

                if (res) {
                    alert(res.data.message);
                }
            }
            catch (err) { alert(err) }
        },

        //to edit new video lectures
        async EditVideo({ Commit, state }, value) {
            console.log(value.title);

            try {
                const res = await axios.patch(`http://localhost:3000/courses/updateVideoLecture/${state.courseDraft.id}`, {
                    videoTitle: value.title,
                    sectionIndex: value.sectionIndex,
                    videoIndex: value.videoIndex
                });

                if (res) {
                    alert(res.data.message);
                }
            }
            catch (err) { alert(err) }
        }

    },


    getters: {

        currentCompGetter(state) {
            return state.currentComp;
        },
        courseDraftGetter(state) {
            return state.courseDraft;
        },

    },
}