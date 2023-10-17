import axios from 'axios';
import chalk from 'chalk';

export default {
    namespaced: true,
    state: {
        instructorId: '',
        currentComp: 'PlanCourse',
        courseDraft:{
            title: '',
            miniDescription: '',
            instructor: '',
            category: '',
            fullDescription: '',
            pricing: {
                basePrice: 0,
                discountType: 0,
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
        },

        pricing(state, val) {
            state.pricing.basePrice = this.basePrice;
            state.pricing.discountType = this.discountType;
            state.pricing.discountAmount = this.discountAmount;
            state.pricing.discountPercent = this.discountPercent;
            state.pricing.priceAfterDiscount = this.priceAfterDiscount;
            state.pricing.tax = this.tax;
            state.pricing.finalPrice = this.finalPrice;
        }

      

    },


    actions: {
        // for PlanCourse Component -> used in instructor: create course/ plan course
        async planCourseAction({ commit }, { value }) {
            console.log('value: '+value);

            const res = await axios.post(
                'http://localhost:3000/courses',
                {
                    title: value.name,
                    miniDescription: value.miniDesc,
                    email: value.email,
                    category: value.category
                }
            )
                .then((res) => {
                    if (res.status === 201) {
                        alert("Course Planning Completed!");
                        commit('planCourse', { title: value.name, miniDescription: value.miniDesc, category: value.category });
                        commit('changeCurrentComp', 'LandingPage')
                    }
                console.log(res.status+': '+res.statusText);
                })
                .catch((err) => {
                    alert(err);
            })
        },

        //for pricing Component -> used in instructor: create course/ pricing page
        async pricingAction({ commit }, { value }) {
            // console.log(value.basePrice);

            await axios.post('')
        }
      

      
    },


    getters: {

        currentCompGetter(state) {
            return state.currentComp;
        }

    },
}