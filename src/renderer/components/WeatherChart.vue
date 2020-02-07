<template>
  <base-chart  :chart-data="this.chartData" :options="this.options"></base-chart>
</template>

<script>
import BaseChart from "./ChartBase";
import Axios from "axios";

export default {
  components: { "base-chart": BaseChart },
  props: ["payload"],
  data: () => ({
    loading: true,
    options: {
      legend: {
        display: true,
        position: "bottom",
        label: {
          boxWidth: 0,
          usePointStyle: true
        }
      },
      layout: {
        padding: {
          top: 20
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax: 20,
              suggestedMin: -10,
              beginAtZero: false
            },
            gridLines: {
              display: true,
              color: "rgba(245,245,245, 0.2)"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(245,245,245, 0.2)"
            }
          }
        ]
      }
    }
  }),
  computed: {
    chartData: function() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Temperature of day",
            data: this.weatherData,
            backgroundColor: "rgba(33,33,33, 0)",
            pointBackgroundColor: "rgba(255,77,13, 0.5)",
            pointRadius: 4,
            pointHoverRadius: 10,
            borderColor: "rgba(255,77,13, 1)",
            borderWidth: 2
          },
          {
            label: "Feel temp of day",
            data: this.feelWeatherData,
            backgroundColor: "rgba(33,33,33, 0)",
            pointBackgroundColor: "rgba(155,26,252, 0.5)",
            borderColor: "rgba(155,26,252, 1)",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 10
          },
          {
            label: "Humidity percentage",
            data: this.humidityData,
            backgroundColor: "rgba(33,33,33, 0)",
            pointBackgroundColor: "rgba(228,234,30, 0.5)",
            borderColor: "rgba(228,234,30, 1)",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 10
          }
        ]
      };
    },
    labels: function() {
      return this.payload.list.map(wet => this.getDisplayTime(wet.dt_txt));
    },
    weatherData: function() {
      return this.payload.list.map(wet => wet.main.temp);
    },
    feelWeatherData: function() {
      return this.payload.list.map(wet => wet.main.feels_like);
    },
    humidityData: function() {
      return this.payload.list.map(wet => wet.main.humidity);
    }
  },
  methods: {
    getDisplayTime: function(datestr) {
      const date = new Date(datestr);
      return `${date.getHours()}:00`;
    }
  },

  async mounted() {
  }
};
</script>

<style>
</style>