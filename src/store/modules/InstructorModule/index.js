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
            pricing: {
                basePrice: 0,
                discountType: '',
                discountAmount: 0,
                discountPercent: 0,
                priceAfterDiscount: 0,
                tax: 0,
                finalPrice: 0
            },
            rating: '',
            duration: '',
            lectures: '',
            status: '',
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

        landingPage(state, val) {
            state.fullDescription = val.fullDescription;
        }

    },


    actions: {

        //for getting current draft course
        async getDraftCourse({ commit, state }, value) {
            console.log(value);

            if (value) {
                try {
                    const res = await axios.get(`http://localhost:3000/courses/${value}`)

                    if (res) {
                        // console.log(res.data);
                        // console.log(res.data.item.title);
                        // console.log(res.data.item.price.basePrice);
                        // console.log(state.courseDraft.pricing);

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

        //for course landing page, background Image
        async landingPageAction({ commit, state }, { value }) {
            // console.log(value.fullDescription);
            // console.log(state.courseDraft.id);

            try {
                const res = await axios.patch(`http://localhost:3000/courses/landingPage/${state.courseDraft.id}`,
                    {
                        fullDescription: value.fullDescription
                    });
                if (res.data.message === "Landing Page Created!") {
                    alert(res.data.message);
                    commit('landingPage', {fullDescription: value.fullDescription})
                }
            }
            catch (err) {
                alert(err);
            }
        }

    },


    getters: {

        currentCompGetter(state) {
            return state.currentComp;
        },
        courseDraftGetter(state) {
            setTimeout(() => {
                // console.log( state.courseDraft);
            },1)
            return state.courseDraft;
        },

    },
}