<template>
  <!-- <div>HELLO</div> -->
  <div style="width:45%; margin-top:12% !important">
    <Line :data="data" :options="options"/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default {
  components: {
    Line,
  },

  props:['data'],
  data() {
    return {
      options: {
        responsive: true,
      },
    };
  },

  mounted() {
    // console.log(this.data);
  }
};
</script>