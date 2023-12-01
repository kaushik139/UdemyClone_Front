<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!-- Base Price -> to Instructor -->
        <v-row>
          <v-col name="col-1" class="mt-4" cols="4"><h5>Enter a Basic Amount:</h5></v-col>
          <v-col cols="8">
            <div class="row">
              <v-text-field
              name="basePrice"
                prepend-icon="mdi-currency-inr"
                label="Enter a Price"
                v-model="basePrice"
                type="number"
                step="10"
                style="max-width: 50%"
                :max="1000"
              ></v-text-field>
            </div>
          </v-col>
          <!-- slider -->
          <v-row class="justify-content-center" style="max-width: 80%">
            <v-slider
            name="base-price-slider"
              v-model="basePrice"
              step="1"
              color="rgb(131,0,0)"
              min="0"
              max="1000"
              prepend-icon="mdi-currency-inr"
            ></v-slider>
          </v-row>
        </v-row>

        <v-divider inset width="95%"></v-divider>

        <!-- Discount Type -->
        <v-row>
          <v-col class="mt-2" cols="4"> <h5>Select Discount Type:</h5></v-col>
          <v-col cols="8">
            <div class="row">
              <v-radio-group v-model="discountType">
                <v-row>
                  <v-col cols="4">
                    <v-radio label="Amount" value="amount"></v-radio>
                  </v-col>
                  <v-col cols="4">
                    <v-radio label="Percentage" value="percent"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>

        <!-- set Discount -->
        <!-- in amount -->
        <v-row class="mt-n10" v-if="discountType === 'amount'">
          <v-col class="mt-4" cols="4 "> <h6>Enter Discount amount:</h6></v-col>
          <v-col cols="8">
            <div class="row">
              <v-text-field
                prepend-icon="mdi-currency-inr"
                label="Enter a Price"
                v-model="discountAmount"
                type="number"
                step="10"
                style="max-width: 50%"
              ></v-text-field>
            </div>
          </v-col>
          <!-- slider -->
          <v-row class="justify-content-center" style="max-width: 80%">
            <v-slider
              v-model="discountAmount"
              step="1"
              color="rgb(131,0,0)"
              min="0"
              :max="basePrice"
              prepend-icon="mdi-currency-inr"
            ></v-slider>
          </v-row>
        </v-row>

        <!-- in percentage -->
        <v-row class="mt-n10" v-if="discountType === 'percent'">
          <v-col class="mt-4" cols="4"> Enter a Percentage: </v-col>
          <v-col cols="8">
            <div class="row">
              <v-text-field
                prepend-icon="mdi-currency-inr"
                label="Enter a Percent"
                v-model="discountPercent"
                type="number"
                step="10"
                style="max-width: 50%"
              ></v-text-field>
            </div>
          </v-col>
          <!-- slider -->
          <v-row class="justify-content-center" style="max-width: 80%">
            <v-slider
              v-model="discountPercent"
              step="5"
              color="rgb(131,0,0)"
              min="0"
              max="100"
              show-ticks="always"
              tick-size="5"
              prepend-icon="mdi-percent"
            ></v-slider>
          </v-row>
        </v-row>

        <v-divider inset width="95%"></v-divider>

        <!-- final amount part -->
        <v-row class="mt-2">
          <v-col cols="4 p-3">
            <h6>Basic Amount:</h6>
            <br />
            <h6>Discount:</h6>
            <br />
            <h6>Price after discount:</h6>
            <br />
            <h6>Taxes:</h6>
            <br />
            <h5 style="margin-top: -2px">Final Price:</h5>
          </v-col>
          <v-col cols="2" class="">
            <p class="p-1">
              <v-icon>{{ mdiCurrencyInr }}</v-icon> {{ basePrice }}
            </p>
            <p class="p-1">
              <v-icon>{{ mdiCurrencyInr }}</v-icon>
              {{
                discountAmount ||
                Math.round(basePrice * (discountPercent / 100))
              }}
            </p>
            <p class="p-1">
              <v-icon>{{ mdiCurrencyInr }}</v-icon> {{ priceAfterDiscount }}
            </p>
            <p class="p-1">
              <v-icon>{{ mdiCurrencyInr }}</v-icon> {{ tax }}
            </p>
            <div class="p-1">
              <v-icon>{{ mdiCurrencyInr }}</v-icon>
              <h5 style="display: inline">{{ finalPrice }}</h5>
            </div>
          </v-col>
        </v-row>
        <!-- Submit Buttons -->
        <v-btn class="btn" @click="submit">Add Price</v-btn>
        <v-btn class="btn" @click="reset">Reset</v-btn>
        <!-- ending tags -->
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "PricingPage",
  computed: {
    priceAfterDiscount() {
      if (this.discountType === "amount") {
        return this.basePrice - this.discountAmount;
      } else {
        return (
          this.basePrice -
          Math.round(this.basePrice * (this.discountPercent / 100))
        );
      }
    },
    tax() {
      if (this.basePrice === 0) return 0;
      if (this.basePrice <= 200) return 15;
      else return Math.round(this.basePrice * 0.1);
    },
    finalPrice() {
      return this.priceAfterDiscount + this.tax;
    },
    ...mapGetters(["instructor/courseDraftGetter"]),
  },
  data: () => ({
    basePrice: 0,
    baseSavedValue: false,
    discountType: "amount",
    discountAmount: 0,
    discountPercent: 0,
    mdiCurrencyInr: "mdi-currency-inr",
  }),

  watch: {
    basePrice(newValue, oldValue) {
      if (this.basePrice < 0) {
        this.basePrice = 0;
      }
      if (this.basePrice > 1000) {
        this.basePrice = 1000;
      }
      if (this.baseSavedValue === true) {
        this.discountAmount =
          this["instructor/courseDraftGetter"].pricing.discountAmount;
        this.baseSavedValue = false;
      } else this.discountAmount = 0;
    },
  },

  methods: {
    //method to submit form
    submit() {
      const pricing = {
        basePrice: this.basePrice,
        discountType: this.discountType,
        discountAmount: this.discountAmount,
        discountPercent: this.discountPercent,
        priceAfterDiscount: this.priceAfterDiscount,
        tax: this.tax,
        finalPrice: this.finalPrice,
      };

      this.$store.dispatch("instructor/pricingAction", { value: pricing });
    },

    //method to clear form
    reset() {
      this.basePrice = 0;
      this.discountType = "amount";
      this.discountAmount = 0;
      this.discountPercent = 0;
    },
  },

  mounted() {
    setTimeout(() => {
      // console.log(this['instructor/courseDraftGetter'].pricing.basePrice);
      this.basePrice = this["instructor/courseDraftGetter"].pricing.basePrice;
      this.discountType =
        this["instructor/courseDraftGetter"].pricing.discountType;
      this.baseSavedValue = true;
      this.discountPercent =
        this["instructor/courseDraftGetter"].pricing.discountPercent;
    }, 1);
  },
};
</script>
  
<style scoped>
.btn {
  margin: 10px;
  background-color: rgb(248, 123, 123);
}
.btn:hover {
  color: white;
  background-color: rgb(131, 0, 0);
}
</style>