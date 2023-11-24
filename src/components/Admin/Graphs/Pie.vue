<template>
    <div style="width:40%;">
        <Pie :data="data" :options="options" />
    </div> 
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: {
    Pie,
  },
  props: ["data", "options"],
};
</script>