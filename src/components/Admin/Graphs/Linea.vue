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
  data() {
    return {
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
          {
            label: "Data OnTWO",
            backgroundColor: "green",
            data: [140, 139, 110, 140, 139, 80, 140],
          },
        ],
      },
      options: {
        responsive: true,
      },
    };
  },
};
</script>