<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!-- Base Price -> to Instructor -->
        <v-row>
          <v-col class="mt-4" cols="4"> Enter a Basic Amount: </v-col>
          <v-col cols="8">
            <div class="row">
              <v-text-field
                prepend-icon="mdi-currency-inr"
                label="Enter a Price"
                v-model="basePrice"
                type="number"
                step="10"
                style="max-width: 50%"
              ></v-text-field>
            </div>
          </v-col>
          <!-- slider -->
          <v-row class="justify-content-center" style="max-width: 80%;">
            <v-slider v-model="basePrice" step="1" color="rgb(131,0,0)" min="0" max="1000"
            prepend-icon="mdi-currency-inr"
            ></v-slider>
          </v-row>
        </v-row>

        <v-divider inset></v-divider>


        <!-- Discount Type -->
        <v-row>
          <v-col class="mt-2" cols="4"> Select Discount Type: </v-col>
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
          <v-col class="mt-4" cols="4 "> Enter Discount amount: </v-col>
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
          <v-row class="justify-content-center" style="max-width: 80%;">
            <v-slider v-model="discountAmount" step="1" color="rgb(131,0,0)" min="0" :max="basePrice"
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
          <v-row class="justify-content-center" style="max-width: 80%;">
            <v-slider v-model="discountPercent" step="5" color="rgb(131,0,0)" min="0" max="100"
      show-ticks="always"
      tick-size="5"
            prepend-icon="mdi-percent"
            ></v-slider>
          </v-row>
        </v-row>





      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
export default {
  name: "PricingPage",

  data: () => ({
    basePrice: "",
        discountType: "amount",
        discountAmount: '',
        discountPercent:'',
        
  }),
};
</script>
  